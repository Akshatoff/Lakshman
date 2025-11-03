"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SvgSprite from "@/components/common/SvgSprite";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  title: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceCents: number;
  originalPriceCents?: number;
  discount?: number;
  image: string;
  images: any;
  inventory: number;
  category: string;
  rating: number;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const newQty = Math.max(1, current + change);
      return { ...prev, [productId]: newQty };
    });
  };

  const getQuantity = (productId: number) => quantities[productId] || 1;

  const handleAddToCart = async (productId: number) => {
    const quantity = getQuantity(productId);
    await addToCart(productId, quantity);
    // Reset quantity after adding
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (result.success) {
          const foundProduct = result.data.products.find(
            (p: Product) => p.id === slug,
          );
          setProduct(foundProduct || null);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <SvgSprite />
      <Header />

      <div className="container py-5">
        <div className="row">
          {/* Breadcrumb */}
          <div className="col-12 mb-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/#products">Products</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>

          {/* Product Details */}
          <div className="col-lg-6 mb-4">
            <div className="product-image-container position-relative">
              {product.discount && (
                <span className="badge bg-success position-absolute top-0 start-0 m-3 fs-5">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="badge bg-primary position-absolute top-0 end-0 m-3 fs-5">
                  NEW
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="img-fluid rounded shadow"
                priority
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-details">
              <h1 className="display-4 fw-bold mb-3">{product.name}</h1>

              {product.isBestseller && (
                <span className="badge bg-warning text-dark mb-3 fs-6">
                  ⭐ Bestseller
                </span>
              )}

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="rating me-2">
                  <svg width="24" height="24" className="text-warning">
                    <use xlinkHref="#star-solid"></use>
                  </svg>
                  <span className="fs-5 fw-semibold ms-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-muted">
                  ({Math.floor(Math.random() * 500) + 100} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="d-flex align-items-baseline gap-3">
                  <h2 className="display-5 fw-bold text-success mb-0">
                    ₹{product.price.toLocaleString()}
                  </h2>
                  {product.originalPriceCents && (
                    <span className="h4 text-muted text-decoration-line-through">
                      ₹{product.originalPriceCents.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-success fw-semibold mt-2">
                    You save ₹
                    {(
                      (product.originalPriceCents || product.price) -
                      product.price
                    ).toLocaleString()}{" "}
                    ({product.discount}% off)
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <p className="text-muted mb-2">
                  <strong>Quantity:</strong> {getQuantity(product.id)}
                </p>
                <p className="text-muted mb-2">
                  <strong>Category:</strong>{" "}
                  <span className="text-capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                </p>
                <p className="text-success fw-semibold">
                  <svg width="16" height="16" className="me-1">
                    <use xlinkHref="#check-circle"></use>
                  </svg>
                  In Stock
                </p>
              </div>

              {/* Add to Cart Section */}
              <div className="border-top pt-4">
                <div className="row g-3">
                  <div className="col-12">
                    <a
                      href="#"
                      className="nav-link add-to-cart"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product.id);
                      }}
                    >
                      <button className="btn btn-success btn-lg w-100 py-3">
                        <svg width="24" height="24" className="me-2">
                          <use xlinkHref="#shopping-cart"></use>
                        </svg>
                        Add to Cart
                      </button>
                    </a>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-outline-secondary btn-lg w-100 py-3">
                      <svg width="24" height="24" className="me-2">
                        <use xlinkHref="#heart"></use>
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="mt-5">
                <h3 className="h4 fw-bold mb-3">Product Description</h3>
                <p className="text-muted">
                  Experience premium quality with our {product.name}. This
                  carefully crafted furniture piece combines style, comfort, and
                  durability to enhance your living space. Made with
                  high-quality materials and modern design principles, it&apos;s
                  the perfect addition to your home.
                </p>

                <h4 className="h5 fw-bold mt-4 mb-3">Key Features:</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <svg width="16" height="16" className="text-success me-2">
                      <use xlinkHref="#check"></use>
                    </svg>
                    Premium quality materials
                  </li>
                  <li className="mb-2">
                    <svg width="16" height="16" className="text-success me-2">
                      <use xlinkHref="#check"></use>
                    </svg>
                    Modern and elegant design
                  </li>
                  <li className="mb-2">
                    <svg width="16" height="16" className="text-success me-2">
                      <use xlinkHref="#check"></use>
                    </svg>
                    Easy to assemble and maintain
                  </li>
                  <li className="mb-2">
                    <svg width="16" height="16" className="text-success me-2">
                      <use xlinkHref="#check"></use>
                    </svg>
                    1-year warranty included
                  </li>
                  <li className="mb-2">
                    <svg width="16" height="16" className="text-success me-2">
                      <use xlinkHref="#check"></use>
                    </svg>
                    Free home delivery available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <Link href="/#products" className="btn btn-outline-primary btn-lg">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
