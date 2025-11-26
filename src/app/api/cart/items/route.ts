import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Database } from "@/types/supabase";

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
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
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
    const { productId, quantity } = await request.json();

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    // ⭐ TRANSACTION — Inventory check + cart update happen together
    const cartItem = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: parseInt(productId) },
        select: { id: true, inventory: true },
      });

      if (!product || product.inventory < quantity) {
        throw new Error("Insufficient inventory");
      }

      return tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: parseInt(productId),
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          cartId: cart.id,
          productId: parseInt(productId),
          quantity,
        },
      });
    });

    return NextResponse.json({ success: true, cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
