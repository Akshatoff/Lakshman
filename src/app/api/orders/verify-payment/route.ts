import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Database } from "@/types/supabase";
import crypto from "crypto";

// POST /api/orders/verify-payment - Verify Razorpay payment
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      body;

    if (
      !orderId ||
      !razorpayPaymentId ||
      !razorpayOrderId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        { error: "Missing payment verification data" },
        { status: 400 },
      );
    }

    // Verify order belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
        userId: user.id,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Verify Razorpay signature
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret) {
      console.error("Razorpay secret key not configured");
      return NextResponse.json(
        { error: "Payment verification failed - configuration error" },
        { status: 500 },
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      // Payment verification failed
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: {
          paymentStatus: "FAILED",
          status: "CANCELLED",
        },
      });

      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 },
      );
    }

    // Payment verified successfully - update order
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        paymentStatus: "PAID",
        status: "PROCESSING",
        paymentMethod: "razorpay",
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
