import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Database } from "@/types/supabase";

// GET /api/reviews - Get reviews for a product
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 },
    );
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      reviews,
      averageRating: avgRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/reviews - Create a review
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
    const { productId, rating, title, comment } = await request.json();

    // Validate input
    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Check if user has already reviewed this product
    const existing = await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: parseInt(productId),
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 },
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: user.id,
        productId: parseInt(productId),
        rating: parseInt(rating),
        title: title || null,
        comment,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Update product average rating
    const allReviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
    });

    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { rating: avgRating },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/reviews - Update helpful count
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
    const { reviewId } = await request.json();

    const review = await prisma.review.update({
      where: { id: parseInt(reviewId) },
      data: {
        helpful: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
