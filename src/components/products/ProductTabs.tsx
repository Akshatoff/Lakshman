"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface ProductTabsProps {
  products: Product[];
}

// Furniture categories to exclude from homepage
const FURNITURE_CATEGORIES = [
  "home-chairs", "home-tables", "home-sofas", "home-beds", "home-storage",
  "office-chairs", "office-desks", "office-cabinets", "office-tables", "office-storage",
];

const CATEGORY_LABELS: Record<string, string> = {
  "men-tshirts": "Men's T-Shirts",
  "men-pants": "Men's Pants",
  "men-shirts": "Men's Shirts",
  "men-jackets": "Men's Jackets",
  "women-tshirts": "Women's T-Shirts",
  "women-pants": "Women's Pants",
  "women-dresses": "Women's Dresses",
  "women-skirts": "Women's Skirts",
  "kids-tshirts": "Kids' T-Shirts",
  "kids-pants": "Kids' Pants",
  "kids-dresses": "Kids' Dresses",
  "kids-sets": "Kids' Sets",
  "running": "Running",
  "cricket": "Cricket",
  "football": "Football",
  "basketball": "Basketball",
  "sports-shoes": "Sports Shoes",
  "casual-shoes": "Casual Shoes",
  "cricket-bat": "Cricket Bats",
  "cricket-ball": "Cricket Balls",
  "gloves": "Gloves",
  "backpack": "Backpacks",
};

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 1, alignItems: "center" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 24 24"
        fill={i <= Math.round(rating) ? "#f59e0b" : "none"}
        stroke="#f59e0b" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
    <span style={{ fontSize: "0.7rem", color: "#888", marginLeft: 3 }}>({rating.toFixed(1)})</span>
  </div>
);

const ProductCard = ({ product, onAddToCart }: {
  product: Product;
  onAddToCart: (id: number, qty: number) => void;
}) => {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    await onAddToCart(product.id, qty);
    setAdding(false);
    setQty(1);
  };

  const displayName = product.name || product.title;
  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = product.originalPriceCents ? product.originalPriceCents / 100 : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: hovered ? "1.5px solid #1a5c38" : "1.5px solid #e8e8e8",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        boxShadow: hovered ? "0 8px 28px rgba(26,92,56,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Image area */}
      <Link href={`/product/${product.id}`} style={{ display: "block", position: "relative" }}>
        {/* Badges */}
        <div style={{ position: "absolute", top: 8, left: 8, zIndex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
          {hasDiscount && (
            <span style={{
              background: "#1a5c38", color: "#fff",
              fontSize: "0.62rem", fontWeight: 800,
              letterSpacing: "0.06em", padding: "2px 7px",
              borderRadius: 2, textTransform: "uppercase",
            }}>
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span style={{
              background: "#d4a017", color: "#fff",
              fontSize: "0.62rem", fontWeight: 800,
              letterSpacing: "0.06em", padding: "2px 7px",
              borderRadius: 2, textTransform: "uppercase",
            }}>
              New
            </span>
          )}
          {product.isBestseller && (
            <span style={{
              background: "#c0392b", color: "#fff",
              fontSize: "0.62rem", fontWeight: 800,
              letterSpacing: "0.06em", padding: "2px 7px",
              borderRadius: 2, textTransform: "uppercase",
            }}>
              Best
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.preventDefault()}
          style={{
            position: "absolute", top: 8, right: 8, zIndex: 3,
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            border: "1px solid #eee",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <svg width="13" height="13" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Product image */}
        <div style={{
          background: "#f7f7f3",
          aspectRatio: "3/4",
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={displayName}
            width={300}
            height={400}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
      </Link>

      {/* Details */}
      <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#1a5c38",
        }}>
          {CATEGORY_LABELS[product.category] || product.category.replace(/-/g, " ")}
        </span>

        <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{
            fontSize: "0.82rem", fontWeight: 600,
            color: "#1a1a1a", margin: 0, lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            {displayName}
          </h3>
        </Link>

        <StarRating rating={product.rating} />

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
          <span style={{
            fontSize: "1rem", fontWeight: 800,
            color: "#1a1a1a",
            fontFamily: "'Playfair Display', serif",
          }}>
            ₹{product.price.toLocaleString()}
          </span>
          {originalPrice && originalPrice > product.price && (
            <span style={{
              fontSize: "0.75rem", color: "#aaa",
              textDecoration: "line-through",
            }}>
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
          {hasDiscount && (
            <span style={{ fontSize: "0.7rem", color: "#1a5c38", fontWeight: 700 }}>
              {product.discount}% off
            </span>
          )}
        </div>

        {/* Qty + Add */}
        <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center",
            border: "1px solid #ddd", borderRadius: 2,
            overflow: "hidden", flexShrink: 0,
          }}>
            <button onClick={(e) => { e.preventDefault(); setQty(q => Math.max(1, q - 1)); }}
              style={{
                width: 24, height: 28, background: "none", border: "none",
                cursor: "pointer", fontSize: "0.9rem", color: "#444",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>−</button>
            <span style={{
              minWidth: 22, textAlign: "center",
              fontSize: "0.78rem", fontWeight: 700, color: "#1a1a1a",
            }}>{qty}</span>
            <button onClick={(e) => { e.preventDefault(); setQty(q => q + 1); }}
              style={{
                width: 24, height: 28, background: "none", border: "none",
                cursor: "pointer", fontSize: "0.9rem", color: "#444",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>+</button>
          </div>

          <button
            onClick={handleAdd}
            disabled={adding}
            style={{
              flex: 1,
              background: adding ? "#2d7a52" : "#1a5c38",
              color: "#fff",
              border: "none", borderRadius: 2,
              padding: "6px 8px",
              fontSize: "0.68rem", fontWeight: 800,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: adding ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {adding ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Promotional banner between product rows
const PromoBanner = ({ index }: { index: number }) => {
  const banners = [
    {
      bg: "linear-gradient(135deg, #1a5c38 0%, #2d7a52 50%, #1a5c38 100%)",
      tag: "New Collection",
      title: "Men's Ethnic Wear",
      subtitle: "Crafted for celebrations & everyday elegance",
      cta: "Explore Now",
      href: "/products?category=men-shirts",
      accent: "#d4a017",
    },
    {
      bg: "linear-gradient(135deg, #8b1a1a 0%, #c0392b 50%, #8b1a1a 100%)",
      tag: "Festival Special",
      title: "Women's Collection",
      subtitle: "Traditional designs meet modern silhouettes",
      cta: "Shop Now",
      href: "/products?category=women-dresses",
      accent: "#f8c471",
    },
    {
      bg: "linear-gradient(135deg, #1a3a5c 0%, #2c6496 50%, #1a3a5c 100%)",
      tag: "Kids Special",
      title: "Little Stars Collection",
      subtitle: "Adorable styles for your little ones",
      cta: "Discover",
      href: "/products?category=kids-tshirts",
      accent: "#f39c12",
    },
  ];
  const banner = banners[index % banners.length];
  return (
    <div style={{
      gridColumn: "1 / -1",
      background: banner.bg,
      borderRadius: 6,
      padding: "28px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* decorative circles */}
      <div style={{
        position: "absolute", right: -40, top: -40,
        width: 200, height: 200,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
      }} />
      <div style={{
        position: "absolute", right: 80, bottom: -60,
        width: 160, height: 160,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
      }} />
      <div>
        <span style={{
          display: "block",
          fontSize: "0.65rem", fontWeight: 800,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: banner.accent, marginBottom: 6,
        }}>{banner.tag}</span>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 700, color: "#fff",
          margin: "0 0 6px",
        }}>{banner.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.85rem", margin: 0 }}>
          {banner.subtitle}
        </p>
      </div>
      <Link href={banner.href} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: banner.accent, color: "#1a1a1a",
        padding: "10px 22px",
        fontSize: "0.75rem", fontWeight: 800,
        letterSpacing: "0.1em", textTransform: "uppercase",
        textDecoration: "none", borderRadius: 2,
        flexShrink: 0,
        transition: "opacity 0.2s",
      }}>
        {banner.cta}
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

const CategoryPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? "#1a5c38" : "#fff",
      color: active ? "#fff" : "#444",
      border: `1.5px solid ${active ? "#1a5c38" : "#e0e0e0"}`,
      borderRadius: 20,
      padding: "6px 16px",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.05em",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
      fontFamily: "inherit",
    }}
  >
    {label}
  </button>
);

const ITEMS_PER_PAGE = 20;

const ProductTabs: React.FC<ProductTabsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { addToCart } = useCart();

  // Filter out furniture
  const clothingProducts = useMemo(() =>
    products.filter(p => !FURNITURE_CATEGORIES.includes(p.category)),
    [products]
  );

  const filtered = useMemo(() => {
    if (activeTab === "new") return clothingProducts.filter(p => p.isNew);
    if (activeTab === "bestseller") return clothingProducts.filter(p => p.isBestseller);
    return clothingProducts;
  }, [clothingProducts, activeTab]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const tabs = [
    { key: "all", label: "All Products" },
    { key: "new", label: "New Arrivals" },
    { key: "bestseller", label: "Bestsellers" },
  ];

  // Insert promo banners every 12 items
  const itemsWithBanners: Array<{ type: "product"; product: Product } | { type: "banner"; index: number }> = [];
  let bannerCount = 0;
  visible.forEach((product, i) => {
    if (i > 0 && i % 12 === 0) {
      itemsWithBanners.push({ type: "banner", index: bannerCount++ });
    }
    itemsWithBanners.push({ type: "product", product });
  });

  return (
    <section style={{ padding: "0 0 4rem" }}>
      {/* Section header */}
      <div style={{
        padding: "3rem 0 0",
        marginBottom: "1.5rem",
        borderTop: "3px solid #1a5c38",
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}>
          <div>
            <span style={{
              display: "block",
              fontSize: "0.65rem", fontWeight: 800,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#1a5c38", marginBottom: 6,
            }}>Our Collection</span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700, color: "#1a1a1a",
              margin: 0, letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}>
              Trending Products
            </h2>
          </div>
          <Link href="/products" style={{
            fontSize: "0.72rem", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#1a5c38", textDecoration: "none",
            display: "flex", alignItems: "center", gap: 5,
            borderBottom: "1.5px solid #1a5c38", paddingBottom: 2,
          }}>
            View All
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tabs.map(tab => (
            <CategoryPill
              key={tab.key}
              label={tab.label}
              active={activeTab === tab.key}
              onClick={() => handleTabChange(tab.key)}
            />
          ))}
        </div>
      </div>

      {/* Count */}
      <p style={{
        fontSize: "0.75rem", color: "#999", marginBottom: "1.25rem",
        fontWeight: 500,
      }}>
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#999" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontStyle: "italic" }}>
            No products in this collection.
          </p>
        </div>
      ) : (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}>
            {itemsWithBanners.map((item, i) =>
              item.type === "banner" ? (
                <PromoBanner key={`banner-${item.index}`} index={item.index} />
              ) : (
                <ProductCard
                  key={item.product.id}
                  product={item.product}
                  onAddToCart={addToCart}
                />
              )
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <button
                onClick={() => setVisibleCount(c => c + ITEMS_PER_PAGE)}
                style={{
                  background: "none",
                  border: "2px solid #1a5c38",
                  color: "#1a5c38",
                  padding: "12px 40px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 2,
                  transition: "all 0.25s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#1a5c38";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1a5c38";
                }}
              >
                Load More Products ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductTabs;
