// src/app/api/wishlist/route.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Database } from "@/types/supabase";

// GET /api/wishlist - Get user's wishlist
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
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Use upsert to handle race condition
    const wishlist = await prisma.wishlist.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                name: true,
                priceCents: true,
                originalPriceCents: true,
                discount: true,
                image: true,
                category: true,
                rating: true,
                inventory: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ items: wishlist.items });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/wishlist - Add item to wishlist
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
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId } = await request.json();

    // Use upsert for wishlist to handle race condition
    const wishlist = await prisma.wishlist.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: parseInt(productId),
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Product already in wishlist" },
        { status: 400 }
      );
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId: parseInt(productId),
      },
    });

    return NextResponse.json({ success: true, wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: Request) {
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
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
    });

    if (!wishlist) {
      return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
    }

    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: parseInt(productId),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
