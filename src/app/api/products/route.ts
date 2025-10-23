import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Build where clause
    const where: any = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get total count
    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: offset ? parseInt(offset) : 0,
        take: limit ? parseInt(limit) : 100,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Fetch categories
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },
    });

    // Transform products to match frontend format
    const transformedProducts = products.map((product: any) => ({
      id: product.id.toString(),
      name: product.name || product.title,
      image: product.image || "",
      price: product.priceCents / 100,
      originalPrice: product.originalPriceCents
        ? product.originalPriceCents / 100
        : null,
      discount: product.discount,
      rating: product.rating,
      quantity: "1 Unit",
      category: product.category,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
    }));

    // Transform categories to match frontend format
    const transformedCategories = categories.map((cat: any) => ({
      id: cat.slug,
      name: cat.name,
      image: cat.image || "/images/default-category.png",
      link: `#products`,
    }));

    return NextResponse.json({
      success: true,
      data: {
        products: transformedProducts,
        total,
        categories: transformedCategories,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products - Add new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "price", "category", "image"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Generate slug from name
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Create new product in database
    const newProduct = await prisma.product.create({
      data: {
        title: body.name,
        name: body.name,
        slug: `${slug}-${Date.now()}`,
        description: body.description || "No description available",
        priceCents: Math.round(parseFloat(body.price) * 100),
        originalPriceCents: body.originalPrice
          ? Math.round(parseFloat(body.originalPrice) * 100)
          : null,
        discount: body.discount ? parseInt(body.discount) : null,
        images: body.images || [body.image],
        image: body.image,
        inventory: body.inventory ? parseInt(body.inventory) : 100,
        category: body.category,
        rating: body.rating ? parseFloat(body.rating) : 4.0,
        isNew: body.isNew || false,
        isBestseller: body.isBestseller || false,
        isFeatured: body.isFeatured || false,
      },
    });

    // Transform to frontend format
    const transformedProduct = {
      id: newProduct.id.toString(),
      name: newProduct.name || newProduct.title,
      image: newProduct.image || "",
      price: newProduct.priceCents / 100,
      originalPrice: newProduct.originalPriceCents
        ? newProduct.originalPriceCents / 100
        : null,
      discount: newProduct.discount,
      rating: newProduct.rating,
      quantity: "1 Unit",
      category: newProduct.category,
      isNew: newProduct.isNew,
      isBestseller: newProduct.isBestseller,
    };

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      data: transformedProduct,
    });
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to add product",
      },
      { status: 500 },
    );
  }
}

// PUT /api/products - Update product (requires product ID in body)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 },
      );
    }

    const productId = parseInt(body.id);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Update product
    const updateData: any = {};

    if (body.name) {
      updateData.name = body.name;
      updateData.title = body.name;
    }
    if (body.description) updateData.description = body.description;
    if (body.price)
      updateData.priceCents = Math.round(parseFloat(body.price) * 100);
    if (body.originalPrice)
      updateData.originalPriceCents = Math.round(
        parseFloat(body.originalPrice) * 100,
      );
    if (body.discount !== undefined)
      updateData.discount = parseInt(body.discount);
    if (body.image) {
      updateData.image = body.image;
      updateData.images = body.images || [body.image];
    }
    if (body.inventory !== undefined)
      updateData.inventory = parseInt(body.inventory);
    if (body.category) updateData.category = body.category;
    if (body.rating !== undefined) updateData.rating = parseFloat(body.rating);
    if (body.isNew !== undefined) updateData.isNew = body.isNew;
    if (body.isBestseller !== undefined)
      updateData.isBestseller = body.isBestseller;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    // Transform to frontend format
    const transformedProduct = {
      id: updatedProduct.id.toString(),
      name: updatedProduct.name || updatedProduct.title,
      image: updatedProduct.image || "",
      price: updatedProduct.priceCents / 100,
      originalPrice: updatedProduct.originalPriceCents
        ? updatedProduct.originalPriceCents / 100
        : null,
      discount: updatedProduct.discount,
      rating: updatedProduct.rating,
      quantity: "1 Unit",
      category: updatedProduct.category,
      isNew: updatedProduct.isNew,
      isBestseller: updatedProduct.isBestseller,
    };

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: transformedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update product",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/products - Delete product (requires product ID in query params)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 },
      );
    }

    const id = parseInt(productId);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Delete product
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    // Transform to frontend format
    const transformedProduct = {
      id: deletedProduct.id.toString(),
      name: deletedProduct.name || deletedProduct.title,
      image: deletedProduct.image || "",
      price: deletedProduct.priceCents / 100,
      originalPrice: deletedProduct.originalPriceCents
        ? deletedProduct.originalPriceCents / 100
        : null,
      discount: deletedProduct.discount,
      rating: deletedProduct.rating,
      quantity: "1 Unit",
      category: deletedProduct.category,
      isNew: deletedProduct.isNew,
      isBestseller: deletedProduct.isBestseller,
    };

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      data: transformedProduct,
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete product",
      },
      { status: 500 },
    );
  }
}
