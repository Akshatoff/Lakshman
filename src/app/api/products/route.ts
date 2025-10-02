import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// GET /api/products - Fetch all products

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Read products from JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json",
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    let products = data.products.all;

    // Filter by category
    if (category && category !== "all") {
      products = products.filter(
        (product: any) => product.category === category,
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower),
      );
    }

    // Apply pagination
    const startIndex = offset ? parseInt(offset) : 0;
    const endIndex = limit ? startIndex + parseInt(limit) : products.length;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        total: products.length,
        categories: data.categories,
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
    const requiredFields = ["name", "price", "category", "quantity", "image"];
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

    // Read current products
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json",
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Generate new product ID
    const newId = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create new product object
    const newProduct = {
      id: newId,
      name: body.name,
      image: body.image,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
      discount: body.discount ? parseInt(body.discount) : null,
      rating: body.rating || 4.0,
      quantity: body.quantity,
      category: body.category,
      isNew: body.isNew || false,
      isBestseller: body.isBestseller || false,
    };

    // Add to products array
    data.products.all.push(newProduct);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
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

    // Read current products
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json",
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Find product index
    const productIndex = data.products.all.findIndex(
      (product: any) => product.id === body.id,
    );

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Update product
    const updatedProduct = {
      ...data.products.all[productIndex],
      ...body,
      price: body.price
        ? parseFloat(body.price)
        : data.products.all[productIndex].price,
      originalPrice: body.originalPrice
        ? parseFloat(body.originalPrice)
        : data.products.all[productIndex].originalPrice,
      discount: body.discount
        ? parseInt(body.discount)
        : data.products.all[productIndex].discount,
      rating: body.rating || data.products.all[productIndex].rating,
    };

    data.products.all[productIndex] = updatedProduct;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
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

    // Read current products
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "products.json",
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Find product index
    const productIndex = data.products.all.findIndex(
      (product: any) => product.id === productId,
    );

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Remove product
    const deletedProduct = data.products.all.splice(productIndex, 1)[0];

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
