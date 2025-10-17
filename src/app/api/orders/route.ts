import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Database } from "@/types/supabase";

// GET /api/orders - Fetch user's orders
export async function GET() {
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
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                name: true,
                image: true,
                priceCents: true,
              },
            },
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/orders - Create new order
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
    const {
      items,
      shippingAddressId,
      billingAddressId,
      subtotal,
      tax,
      shipping,
      totalAmount,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 },
      );
    }

    if (!shippingAddressId || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify addresses belong to user
    const shippingAddress = await prisma.address.findFirst({
      where: {
        id: shippingAddressId,
        userId: user.id,
      },
    });

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Invalid shipping address" },
        { status: 400 },
      );
    }

    if (billingAddressId) {
      const billingAddress = await prisma.address.findFirst({
        where: {
          id: billingAddressId,
          userId: user.id,
        },
      });

      if (!billingAddress) {
        return NextResponse.json(
          { error: "Invalid billing address" },
          { status: 400 },
        );
      }
    }

    // Verify product availability and prices
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 },
        );
      }

      if (product.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient inventory for ${product.title}` },
          { status: 400 },
        );
      }

      if (product.priceCents !== item.priceCents) {
        return NextResponse.json(
          { error: `Price mismatch for ${product.title}` },
          { status: 400 },
        );
      }
    }

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx: any) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          shippingAddressId,
          billingAddressId: billingAddressId || shippingAddressId,
          subtotal,
          tax,
          shipping,
          totalAmount,
          paymentMethod: paymentMethod || "cod",
          status: paymentMethod === "cod" ? "PENDING" : "PENDING",
          paymentStatus: paymentMethod === "cod" ? "PENDING" : "PENDING",
        },
      });

      // Create order items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.priceCents,
            totalCents: item.priceCents * item.quantity,
          },
        });

        // Decrease product inventory
        await tx.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    // Fetch complete order with relations
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    return NextResponse.json({ order: completeOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
