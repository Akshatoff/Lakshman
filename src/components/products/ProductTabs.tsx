"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCart } from "@/contexts/CartContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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

interface ProductTabsProps {
  products: Product[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { addToCart } = useCart();

  // Filter products based on active tab
  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "new":
        return products.filter((product) => product.isNew);
      case "bestseller":
        return products.filter((product) => product.isBestseller);
      default:
        return products;
    }
  }, [products, activeTab]);

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

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="product-item" data-product-id={product.id}>
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

      <Link href={`/product/${product.id}`} className="text-decoration-none">
        <figure>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name || product.title}
            width={300}
            height={300}
            className="tab-image object-cover w-full h-64 rounded-lg"
          />
        </figure>

        <h3>{product.name || product.title}</h3>
      </Link>
      <span className="qty">{product.category}</span>
      <div className="rating">
        <svg width="24" height="24" className="text-primary">
          <use xlinkHref="#star-solid"></use>
        </svg>
        {product.rating}
      </div>
      <span className="price">₹{product.price.toLocaleString()}</span>

      <div className="d-flex align-items-center justify-content-between">
        <div className="input-group product-qty">
          <span className="input-group-btn">
            <button
              type="button"
              className="quantity-left-minus btn btn-danger btn-number"
              data-type="minus"
              onClick={() => updateQuantity(product.id, -1)}
            >
              <svg width="16" height="16">
                <use xlinkHref="#minus"></use>
              </svg>
            </button>
          </span>
          <input
            type="text"
            className="form-control input-number quantity"
            value={getQuantity(product.id)}
            min="1"
            readOnly
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="quantity-right-plus btn btn-success btn-number"
              data-type="plus"
              onClick={() => updateQuantity(product.id, 1)}
            >
              <svg width="16" height="16">
                <use xlinkHref="#plus"></use>
              </svg>
            </button>
          </span>
        </div>
        <a
          href="#"
          className="nav-link add-to-cart"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart(product.id);
          }}
        >
          Add to Cart{" "}
          <svg
            width="20"
            height="20"
            style={{ display: "inline-block", verticalAlign: "middle" }}
          >
            <use xlinkHref="#cart"></use>
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="bootstrap-tabs product-tabs">
          <div className="tabs-header d-flex justify-content-between border-bottom my-4">
            <h3 className="fw-bold font-nunito text-black">
              Trending Products
            </h3>
            <nav>
              <div className="nav nav-tabs" role="tablist">
                <button
                  className={`nav-link text-uppercase fs-6 ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`nav-link text-uppercase fs-6 ${activeTab === "new" ? "active" : ""}`}
                  onClick={() => setActiveTab("new")}
                >
                  New Arrival
                </button>
                <button
                  className={`nav-link text-uppercase fs-6 ${activeTab === "bestseller" ? "active" : ""}`}
                  onClick={() => setActiveTab("bestseller")}
                >
                  Bestseller
                </button>
              </div>
            </nav>
          </div>

          <div className="tab-content">
            <div className="tab-pane fade show active">
              {/* Navigation Buttons */}
              <div className="swiper-buttons d-flex gap-2 justify-content-end mb-3">
                <button
                  type="button"
                  className="swiper-prev product-carousel-prev btn btn-outline-primary"
                  aria-label="Previous"
                >
                  ❮
                </button>
                <button
                  type="button"
                  className="swiper-next product-carousel-next btn btn-outline-primary"
                  aria-label="Next"
                >
                  ❯
                </button>
              </div>

              {/* Swiper Carousel */}
              <div className="product-carousel" style={{ overflow: "hidden" }}>
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={4}
                  spaceBetween={25}
                  speed={500}
                  loop={false}
                  grabCursor={true}
                  watchOverflow={true}
                  navigation={{
                    nextEl: ".product-carousel-next",
                    prevEl: ".product-carousel-prev",
                    disabledClass: "swiper-button-disabled",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                    576: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    991: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 25,
                    },
                  }}
                >
                  {filteredProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
