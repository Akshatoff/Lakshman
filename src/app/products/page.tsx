"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories = [
  { id: "all", name: "All Products", image: "/images/category-all.jpg" },
  { id: "men", name: "Men's Clothing", image: "/images/category-men.jpg" },
  { id: "women", name: "Women's Clothing", image: "/images/category-women.jpg" },
  { id: "kids", name: "Kids Clothing", image: "/images/category-kids.jpg" },
  { id: "running", name: "Running", image: "/images/category-running.jpg" },
  { id: "cricket", name: "Cricket", image: "/images/category-cricket.jpg" },
  { id: "football", name: "Football", image: "/images/category-football.jpg" },
  { id: "waskat", name: "Waskat", image: "/images/category-waskat.jpg" },
  { id: "sports-shoes", name: "Sports Shoes", image: "/images/category-sports-shoes.jpg" },
  { id: "casual-shoes", name: "Casual Shoes", image: "/images/category-casual-shoes.jpg" },
  { id: "bat", name: "Bats", image: "/images/category-bat.jpg" },
  { id: "ball", name: "Balls", image: "/images/category-ball.jpg" },
  { id: "gloves", name: "Gloves", image: "/images/category-gloves.jpg" },
  { id: "backpack", name: "Backpacks", image: "/images/category-backpack.jpg" },
  { id: "home-furniture", name: "Home Furniture", image: "/images/category-home.jpg" },
  { id: "office-furniture", name: "Office Furniture", image: "/images/category-office.jpg" },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { addToCart } = useCart();

  // Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products?limit=100");
        const result = await response.json();

        if (result.success) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered = filtered.filter((p) => p.isNew);
        break;
      case "bestseller":
        filtered = filtered.filter((p) => p.isBestseller);
        break;
      default:
        // Featured - default order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, category, sortBy, priceRange, selectedRating]);

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
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  };

  const currentCategory = categories.find((c) => c.id === category);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <section className="py-3 bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/products">Products</Link>
              </li>
              {category !== "all" && (
                <li className="breadcrumb-item active" aria-current="page">
                  {currentCategory?.name}
                </li>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                {currentCategory?.name || "All Products"}
              </h1>
              <p className="lead text-muted">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="col-lg-4">
              <div className="d-flex gap-2 justify-content-lg-end">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">New Arrivals</option>
                  <option value="bestseller">Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="py-3 bg-light border-top border-bottom">
        <div className="container">
                        <div className="d-flex gap-2 flex-wrap overflow-auto">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`btn ${
                  category === cat.id
                    ? "btn-primary"
                    : "btn-outline-secondary"
                } btn-sm text-nowrap`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Filters</h5>

                  {/* Price Range */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3">Price Range</h6>
                    <div className="d-flex gap-2 mb-2">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                        }
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])
                        }
                      />
                    </div>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="50000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                    />
                    <small className="text-muted">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </small>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3">Minimum Rating</h6>
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          id={`rating-${rating}`}
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor={`rating-${rating}`}
                        >
                          <span className="text-warning me-1">★</span>
                          {rating}+ Stars
                        </label>
                      </div>
                    ))}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        id="rating-all"
                        checked={selectedRating === 0}
                        onChange={() => setSelectedRating(0)}
                      />
                      <label className="form-check-label" htmlFor="rating-all">
                        All Ratings
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setPriceRange([0, 50000]);
                      setSelectedRating(0);
                      setSortBy("featured");
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <svg
                    width="80"
                    height="80"
                    fill="currentColor"
                    className="text-muted mb-3"
                  >
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
                  </svg>
                  <h4 className="text-muted">No products found</h4>
                  <p className="text-muted">
                    Try adjusting your filters or browse other categories
                  </p>
                  <Link href="/products" className="btn btn-primary">
                    View All Products
                  </Link>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                      <div className="product-item">
                        {product.discount && (
                          <span className="badge bg-success position-absolute m-3">
                            -{product.discount}%
                          </span>
                        )}

                        <button className="btn-wishlist">
                          <svg width="24" height="24">
                            <use xlinkHref="#heart"></use>
                          </svg>
                        </button>

                        <Link
                          href={`/product/${product.id}`}
                          className="text-decoration-none"
                        >
                          <figure>
                            <Image
                              src={product.image || "/images/placeholder.png"}
                              alt={product.name || product.title}
                              width={200}
                              height={200}
                              className="tab-image object-cover w-full h-64 rounded-lg"
                            />
                          </figure>

                          <h3>{product.name || product.title}</h3>
                        </Link>

                        <span className="qty text-capitalize">
                          {product.category.replace("-", " ")}
                        </span>

                        <div className="rating">
                          <svg width="24" height="24" className="text-warning">
                            <use xlinkHref="#star-solid"></use>
                          </svg>
                          {product.rating}
                        </div>

                        <div className="d-flex align-items-baseline gap-2">
                          <span className="price">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPriceCents && (
                            <span className="text-muted text-decoration-line-through small">
                              ₹{(product.originalPriceCents / 100).toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="input-group product-qty">
                            <button
                              type="button"
                              className="quantity-left-minus btn btn-danger btn-number"
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              <svg width="16" height="16">
                                <use xlinkHref="#minus"></use>
                              </svg>
                            </button>
                            <input
                              type="text"
                              className="form-control input-number quantity"
                              value={getQuantity(product.id)}
                              readOnly
                            />
                            <button
                              type="button"
                              className="quantity-right-plus btn btn-success btn-number"
                              onClick={() => updateQuantity(product.id, 1)}
                            >
                              <svg width="16" height="16">
                                <use xlinkHref="#plus"></use>
                              </svg>
                            </button>
                          </div>

                          <a
                            href="#"
                            className="nav-link add-to-cart"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product.id);
                            }}
                          >
                            <svg width="20" height="20">
                              <use xlinkHref="#cart"></use>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
