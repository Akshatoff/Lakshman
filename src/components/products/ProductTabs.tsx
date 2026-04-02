"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import { useCart } from "@/contexts/CartContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

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

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" fill={filled ? "var(--amber)" : "none"} stroke="var(--amber)" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const RatingStars = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}
  </div>
);

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (id: number, qty: number) => void }) => {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(product.id, qty);
    setAdding(false);
    setQty(1);
  };

  const displayName = product.name || product.title;

  return (
    <div
      className="product-item"
      style={{
        position: "relative",
        background: "var(--warm-white)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginBottom: 0,
        transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-dark)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Badges */}
      {product.discount && (
        <span style={{
          position: "absolute", top: 10, left: 10, zIndex: 2,
          background: "var(--amber)", color: "white",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: 1,
        }}>
          -{product.discount}%
        </span>
      )}
      {product.isNew && (
        <span style={{
          position: "absolute", top: 10, right: product.discount ? "auto" : 10,
          left: product.discount ? "auto" : "auto",
          zIndex: 2,
          background: "var(--charcoal)", color: "white",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: 1,
          ...(product.discount ? { right: 10 } : { right: 10 }),
        }}>
          New
        </span>
      )}

      {/* Wishlist button */}
      <button
        style={{
          position: "absolute", top: product.discount || product.isNew ? 44 : 10, right: 10,
          zIndex: 2, width: 32, height: 32, borderRadius: "50%",
          background: "rgba(255,255,255,0.9)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.25s", color: "var(--muted)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "#fee2e2";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#fca5a5";
          (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
        }}
        aria-label="Add to wishlist"
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <Link href={`/product/${product.id}`} style={{ display: "block", overflow: "hidden" }}>
        <div style={{
          background: "var(--ivory)",
          aspectRatio: "1",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={displayName}
            width={300}
            height={300}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
            onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
          />
        </div>
      </Link>

      {/* Body */}
      <div style={{
        padding: "1rem 1.1rem 1.1rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
      }}>
        {/* Category */}
        <span style={{
          fontSize: "0.68rem", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--amber)",
        }}>
          {product.category.replace(/-/g, " ")}
        </span>

        {/* Name */}
        <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            margin: 0,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLHeadingElement).style.color = "var(--amber)")}
            onMouseLeave={e => ((e.currentTarget as HTMLHeadingElement).style.color = "var(--charcoal)")}
          >
            {displayName}
          </h3>
        </Link>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <RatingStars rating={product.rating} />
          <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 500 }}>
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginTop: "0.1rem" }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--charcoal)",
            letterSpacing: "-0.02em",
          }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPriceCents && (
            <span style={{ fontSize: "0.8rem", color: "var(--muted-light)", textDecoration: "line-through" }}>
              ₹{(product.originalPriceCents / 100).toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "0.6rem",
          gap: "0.5rem",
        }}>
          {/* Qty stepper */}
          <div style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid var(--border)",
            borderRadius: 2,
            background: "var(--ivory)",
            overflow: "hidden",
          }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{
                width: 28, height: 30, background: "none", border: "none",
                cursor: "pointer", color: "var(--charcoal)", fontSize: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "var(--amber)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "none")}
            >
              −
            </button>
            <span style={{
              minWidth: 28, textAlign: "center", fontSize: "0.82rem",
              fontWeight: 700, color: "var(--charcoal)",
            }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{
                width: 28, height: 30, background: "none", border: "none",
                cursor: "pointer", color: "var(--charcoal)", fontSize: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "var(--amber)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "none")}
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={adding}
            style={{
              flex: 1,
              background: adding ? "var(--amber)" : "var(--charcoal)",
              color: "white",
              border: "none",
              borderRadius: 2,
              padding: "0.45rem 0.75rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: adding ? "not-allowed" : "pointer",
              transition: "all 0.25s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
            }}
            onMouseEnter={e => {
              if (!adding) (e.currentTarget as HTMLButtonElement).style.background = "var(--amber)";
            }}
            onMouseLeave={e => {
              if (!adding) (e.currentTarget as HTMLButtonElement).style.background = "var(--charcoal)";
            }}
          >
            {adding ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="10" />
              </svg>
            ) : (
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
            {adding ? "Adding…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductTabs: React.FC<ProductTabsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState("all");
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    if (activeTab === "new") return products.filter(p => p.isNew);
    if (activeTab === "bestseller") return products.filter(p => p.isBestseller);
    return products;
  }, [products, activeTab]);

  const tabs = [
    { key: "all", label: "All" },
    { key: "new", label: "New Arrivals" },
    { key: "bestseller", label: "Bestsellers" },
  ];

  return (
    <div style={{ padding: "4rem 0" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2.5rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <div>
          <span style={{
            display: "block",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--amber)",
            marginBottom: "0.4rem",
          }}>
            Our Collection
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--charcoal)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>
            Trending Products
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeTab === tab.key ? "var(--charcoal)" : "var(--muted)",
                borderBottom: activeTab === tab.key ? "2px solid var(--amber)" : "2px solid transparent",
                transition: "all 0.25s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.key) (e.currentTarget as HTMLButtonElement).style.color = "var(--charcoal)";
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.key) (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {["product-carousel-prev", "product-carousel-next"].map((cls, i) => (
          <button
            key={cls}
            className={`swiper-${i === 0 ? "prev" : "next"} ${cls} btn btn-outline-secondary`}
            aria-label={i === 0 ? "Previous" : "Next"}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "var(--warm-white)",
              border: "1.5px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s",
              color: "var(--charcoal)",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {i === 0 ? <path d="M15 18L9 12l6-6" /> : <path d="M9 18l6-6-6-6" />}
            </svg>
          </button>
        ))}
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Grid]}
        slidesPerView={4}
        spaceBetween={20}
        grid={{ rows: 2, fill: "row" }}
        speed={500}
        loop={false}
        grabCursor
        navigation={{
          nextEl: ".product-carousel-next",
          prevEl: ".product-carousel-prev",
          disabledClass: "swiper-button-disabled",
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12, grid: { rows: 2, fill: "row" } },
          480: { slidesPerView: 2, spaceBetween: 14, grid: { rows: 2, fill: "row" } },
          768: { slidesPerView: 2, spaceBetween: 16, grid: { rows: 2, fill: "row" } },
          992: { slidesPerView: 3, spaceBetween: 18, grid: { rows: 2, fill: "row" } },
          1200: { slidesPerView: 4, spaceBetween: 20, grid: { rows: 2, fill: "row" } },
        }}
        style={{ overflow: "hidden" }}
      >
        {filtered.map(product => (
          <SwiperSlide key={product.id} style={{ height: "auto", paddingBottom: "1.25rem" }}>
            <ProductCard
              product={product}
              onAddToCart={addToCart}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontStyle: "italic" }}>
            No products in this collection yet.
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductTabs;
