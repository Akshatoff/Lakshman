"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  backgroundImage: string;
  tag: string;
  title: string;
  titleItalic?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  align: "left" | "center" | "right";
}

const slides: Slide[] = [
  {
    id: 1,
    backgroundImage: "/images/background-pattern.jpg",
    tag: "New Season",
    title: "Men's Premium",
    titleItalic: "Fleece Collection",
    description: "Crafted for comfort, designed for style. Explore our latest arrivals this season.",
    buttonText: "Shop Now",
    buttonLink: "/products?category=men-tshirts",
    align: "left",
  },
  {
    id: 2,
    backgroundImage: "/images/banner-2.jpg",
    tag: "20% Off",
    title: "Tops & T-Shirts",
    titleItalic: "for Women",
    description: "Effortless elegance for every occasion. Discover styles that move with you.",
    buttonText: "Explore",
    buttonLink: "/products?category=women-tshirts",
    align: "left",
  },
  {
    id: 3,
    backgroundImage: "/images/banner-3.jpg",
    tag: "Exclusive",
    title: "Kurta",
    titleItalic: "Collection",
    description: "Tradition meets contemporary craftsmanship. Celebrate every moment in style.",
    buttonText: "Discover",
    buttonLink: "/products",
    align: "left",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const go = useCallback((next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(next);
    setTimeout(() => setTransitioning(false), 700);
  }, [transitioning]);

  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);

  useEffect(() => {
    setLoaded(true);
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        overflow: "hidden",
        background: "var(--charcoal)",
      }}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${s.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(110deg, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.45) 55%, rgba(26,26,26,0.1) 100%)",
        zIndex: 2,
      }} />

      {/* Decorative line */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: "linear-gradient(to bottom, transparent, var(--amber), transparent)",
        zIndex: 3,
        opacity: 0.7,
      }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          minHeight: "92vh",
          padding: "0 clamp(1.5rem, 6vw, 6rem)",
        }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Tag */}
          <div
            key={`tag-${current}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              animation: loaded ? "fadeInUp 0.6s ease both" : "none",
              animationDelay: "0.1s",
            }}
          >
            <span style={{ display: "block", width: 28, height: 1.5, background: "var(--amber)" }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--amber)",
            }}>
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${current}`}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "1.25rem",
              animation: loaded ? "fadeInUp 0.6s ease both" : "none",
              animationDelay: "0.2s",
            }}
          >
            {slide.title}
            {slide.titleItalic && (
              <>
                <br />
                <em style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.88em",
                }}>
                  {slide.titleItalic}
                </em>
              </>
            )}
          </h1>

          {/* Description */}
          <p
            key={`desc-${current}`}
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: "2.5rem",
              maxWidth: 460,
              animation: loaded ? "fadeInUp 0.6s ease both" : "none",
              animationDelay: "0.3s",
            }}
          >
            {slide.description}
          </p>

          {/* CTA */}
          <div
            key={`cta-${current}`}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              animation: loaded ? "fadeInUp 0.6s ease both" : "none",
              animationDelay: "0.4s",
            }}
          >
            <Link
              href={slide.buttonLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "var(--amber)",
                color: "white",
                padding: "0.85rem 2rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                border: "2px solid var(--amber)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--amber)";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
            >
              {slide.buttonText}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 1.5rem",
                borderBottom: "1.5px solid rgba(255,255,255,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
                (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--amber)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
                (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(255,255,255,0.4)";
              }}
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous"
        style={{
          position: "absolute", top: "50%", left: "1.5rem",
          transform: "translateY(-50%)",
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "white", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5, transition: "all 0.3s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--amber)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--amber)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M15 18L9 12l6-6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next"
        style={{
          position: "absolute", top: "50%", right: "1.5rem",
          transform: "translateY(-50%)",
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "white", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5, transition: "all 0.3s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--amber)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--amber)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "clamp(1.5rem, 6vw, 6rem)",
        display: "flex",
        gap: "0.5rem",
        zIndex: 5,
        alignItems: "center",
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{
              display: "block",
              height: 2,
              width: i === current ? 36 : 16,
              background: i === current ? "var(--amber)" : "rgba(255,255,255,0.4)",
              borderRadius: 2,
              transition: "all 0.4s ease",
            }} />
          </button>
        ))}
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.1em",
          marginLeft: "0.5rem",
        }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        right: "2rem",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <span style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          writingMode: "vertical-rl",
        }}>Scroll</span>
        <div style={{
          width: 1,
          height: 40,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
        }} />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
