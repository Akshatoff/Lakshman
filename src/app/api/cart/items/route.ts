// src/app/api/cart/items/route.ts
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

    // ⭐ OPTIMIZED: Single transaction with fewer queries
    const result = await prisma.$transaction(async (tx) => {
      // Check product inventory
      const product = await tx.product.findUnique({
        where: { id: parseInt(productId) },
        select: { id: true, inventory: true },
      });

      if (!product || product.inventory < quantity) {
        throw new Error("Insufficient inventory");
      }

      // Get or create cart (upsert is more efficient)
      const cart = await tx.cart.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {},
        select: { id: true },
      });

      // Upsert cart item
      const cartItem = await tx.cartItem.upsert({
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
        select: {
          id: true,
          quantity: true,
          productId: true,
        },
      });

      return cartItem;
    });

    return NextResponse.json({ success: true, cartItem: result });
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

// ⭐ NEW: Optimized bulk update endpoint
export async function PUT(request: Request) {
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

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    // ⭐ OPTIMIZED: Direct update without fetching cart first
    const cartItem = await prisma.cartItem.updateMany({
      where: {
        cart: { userId: user.id },
        productId: parseInt(productId),
      },
      data: {
        quantity: quantity,
      },
    });

    if (cartItem.count === 0) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
