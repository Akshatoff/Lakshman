"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductTabs from "@/components/products/ProductTabs";
import Cart from "@/components/cart/Cart";
import Search from "@/components/search/Search";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/common/Preloader";

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

// Category showcase data
const SHOP_CATEGORIES = [
  { label: "Men's Shirts", href: "/products?category=men-shirts", emoji: "👔", color: "#e8f5e9" },
  { label: "Women's Dresses", href: "/products?category=women-dresses", emoji: "👗", color: "#fce4ec" },
  { label: "Kids' Sets", href: "/products?category=kids-sets", emoji: "🧒", color: "#fff3e0" },
  { label: "Sportswear", href: "/products?category=running", emoji: "🏃", color: "#e3f2fd" },
  { label: "Ethnic Wear", href: "/products?category=men-tshirts", emoji: "🥻", color: "#f3e5f5" },
  { label: "Footwear", href: "/products?category=sports-shoes", emoji: "👟", color: "#e0f7fa" },
  { label: "Cricket Gear", href: "/products?category=cricket", emoji: "🏏", color: "#f9fbe7" },
  { label: "Accessories", href: "/products?category=backpack", emoji: "🎒", color: "#fff8e1" },
];

// Feature strips
const FEATURES = [
  { icon: "🚚", title: "Free Delivery", sub: "On orders above ₹1000" },
  { icon: "↩️", title: "Easy Returns", sub: "30-day return policy" },
  { icon: "🔒", title: "Secure Payment", sub: "100% safe transactions" },
  { icon: "💬", title: "24/7 Support", sub: "Always here to help" },
];

// Offer banners
const OFFER_BANNERS = [
  {
    bg: "linear-gradient(120deg, #1a5c38 0%, #2e8b57 100%)",
    tag: "Limited Offer",
    title: "Flat 20% Off",
    sub: "Men's ethnic collection",
    cta: "Shop Men's",
    href: "/products?category=men-shirts",
    accent: "#f8c471",
  },
  {
    bg: "linear-gradient(120deg, #8b1a1a 0%, #c0392b 100%)",
    tag: "Festival Special",
    title: "Women's Sale",
    sub: "Up to 30% on dresses & sets",
    cta: "Shop Women's",
    href: "/products?category=women-dresses",
    accent: "#fad7a0",
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/products?limit=100");
        const result = await response.json();
        if (result.success) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    const timer = setTimeout(() => {
      const preloader = document.querySelector(".preloader-wrapper") as HTMLElement;
      if (preloader) preloader.style.display = "none";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SVG sprite */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <symbol id="cart" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Z" />
          </symbol>
          <symbol id="heart" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Z" />
          </symbol>
          <symbol id="star-solid" viewBox="0 0 15 15">
            <path fill="currentColor" d="M7.953 3.788a.5.5 0 0 0-.906 0L6.08 5.85l-2.154.33a.5.5 0 0 0-.283.843l1.574 1.613-.373 2.284a.5.5 0 0 0 .736.518l1.92-1.063 1.921 1.063a.5.5 0 0 0 .736-.519l-.373-2.283 1.574-1.613a.5.5 0 0 0-.283-.844L8.921 5.85l-.968-2.062Z" />
          </symbol>
          <symbol id="search" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z" />
          </symbol>
          <symbol id="user" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" />
          </symbol>
          <symbol id="plus" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z" />
          </symbol>
          <symbol id="minus" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z" />
          </symbol>
          <symbol id="check" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33Z" />
          </symbol>
          <symbol id="check-circle" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm4.71-10.29-5 5a1 1 0 0 1-1.42 0l-2-2a1 1 0 0 1 1.42-1.42L11 12.59l4.29-4.3a1 1 0 0 1 1.42 1.42Z" />
          </symbol>
          <symbol id="shopping-cart" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Z" />
          </symbol>
          <symbol id="arrow-right" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.92 11.62a1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76Z" />
          </symbol>
          <symbol id="link" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 19a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm0-4a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm-5 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm7-12h-1V2a1 1 0 0 0-2 0v1H8V2a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V6a1 1 0 0 1 1-1h1v1a1 1 0 0 0 2 0V5h8v1a1 1 0 0 0 2 0V5h1a1 1 0 0 1 1 1ZM7 15a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm0 4a1 1 0 1 0-1-1 1 1 0 0 0 1 1Z" />
          </symbol>
        </defs>
      </svg>

      <Preloader />
      <Cart />
      <Search />
      <Header />

      {/* ── HERO ── */}
      <HeroCarousel />

      {/* ── FEATURE STRIP ── */}
      <div style={{
        background: "#1a5c38",
        padding: "0",
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 1400, margin: "0 auto",
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              flex: "1 1 200px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 24px",
              borderRight: i < FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
            }}>
              <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{f.icon}</span>
              <div>
                <div style={{
                  fontWeight: 800, fontSize: "0.78rem",
                  color: "#fff", letterSpacing: "0.04em",
                }}>{f.title}</div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.7)" }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOP BY CATEGORY ── */}
      <section style={{ background: "#f9f6f0", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div>
              <span style={{
                display: "block", fontSize: "0.62rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#1a5c38", marginBottom: 4,
              }}>Browse</span>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700, color: "#1a1a1a", margin: 0,
              }}>Shop by Category</h2>
            </div>
            <Link href="/products" style={{
              fontSize: "0.7rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#1a5c38", textDecoration: "none",
              borderBottom: "1.5px solid #1a5c38", paddingBottom: 2,
            }}>All Categories</Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
          }}>
            {SHOP_CATEGORIES.map((cat) => (
              <Link key={cat.href} href={cat.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: cat.color,
                  borderRadius: 8,
                  padding: "20px 12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  textAlign: "center",
                  border: "1.5px solid transparent",
                  transition: "all 0.25s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#1a5c38";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(26,92,56,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLDivElement).style.transform = "none";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "2rem", lineHeight: 1 }}>{cat.emoji}</span>
                  <span style={{
                    fontSize: "0.72rem", fontWeight: 700,
                    color: "#1a1a1a", lineHeight: 1.2,
                  }}>{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL OFFER BANNERS ── */}
      <section style={{ padding: "2rem", background: "#fff" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}>
          {OFFER_BANNERS.map((b, i) => (
            <div key={i} style={{
              background: b.bg,
              borderRadius: 6,
              padding: "28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              position: "relative",
              overflow: "hidden",
              minHeight: 160,
            }}>
              <div style={{
                position: "absolute", right: -30, bottom: -30,
                width: 140, height: 140, borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
              }} />
              <span style={{
                fontSize: "0.6rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: b.accent,
              }}>{b.tag}</span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem", fontWeight: 700,
                color: "#fff", margin: 0,
              }}>{b.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", margin: 0 }}>
                {b.sub}
              </p>
              <Link href={b.href} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: b.accent, color: "#1a1a1a",
                padding: "8px 18px",
                fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 2,
                marginTop: 4, alignSelf: "flex-start",
              }}>
                {b.cta}
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 8h10M6 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section style={{ background: "#fff", padding: "0 2rem" }} id="products">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <ProductTabs products={products} />
        </div>
      </section>

      {/* ── BRAND STRIP ── */}
      <section style={{
        background: "#1a1a1a",
        padding: "3rem 2rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{
            display: "block", fontSize: "0.62rem", fontWeight: 800,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#d4a017", marginBottom: 12,
          }}>Our Promise</span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700, color: "#fff", margin: "0 0 12px",
          }}>
            Premium Quality from Muzaffarpur
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: "0.88rem",
            lineHeight: 1.7, margin: "0 0 24px",
          }}>
            Lakshman Industries — crafting fine textiles in Bihar's industrial heart since 2018.
            Every garment is made with care, quality, and pride.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/about" style={{
              background: "#d4a017", color: "#1a1a1a",
              padding: "10px 24px",
              fontSize: "0.72rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 2,
            }}>Our Story</Link>
            <Link href="/contact" style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "10px 24px",
              fontSize: "0.72rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 2,
            }}>Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
