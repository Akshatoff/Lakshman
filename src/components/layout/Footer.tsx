"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--charcoal)",
      color: "var(--muted-light)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Main footer grid */}
      <div className="container-fluid" style={{ padding: "5rem 2rem 3rem" }}>
        <div className="row" style={{ gap: "0", rowGap: "3rem" }}>

          {/* Brand column */}
          <div className="col-lg-4 col-md-6">
            <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              <Image
                src="/images/logo.png"
                alt="Laksh-man"
                width={130}
                height={34}
                style={{
                  height: "30px", width: "auto",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            </Link>
            <p style={{
              fontSize: "0.875rem",
              lineHeight: 1.8,
              color: "var(--muted-light)",
              maxWidth: 300,
              marginBottom: "1.75rem",
            }}>
              Premium textiles and outfits crafted in Muzaffarpur, Bihar. Quality that speaks, style that endures.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 2h11a4.5 4.5 0 014.5 4.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z" },
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 34, height: 34,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--muted-light)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--amber)";
                    el.style.borderColor = "var(--amber)";
                    el.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "none";
                    el.style.borderColor = "rgba(255,255,255,0.12)";
                    el.style.color = "var(--muted-light)";
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1.25rem",
            }}>
              Shop
            </h6>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Men's Clothing", href: "/products?category=men-tshirts" },
                { label: "Women's Clothing", href: "/products?category=women-tshirts" },
                { label: "Kids Collection", href: "/products?category=kids-tshirts" },
                { label: "Sportswear", href: "/products?category=running" },
                { label: "Footwear", href: "/products?category=sports-shoes" },
                { label: "Furniture", href: "/products?category=home-chairs" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-light)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-light)")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1.25rem",
            }}>
              Company
            </h6>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Help Center", href: "/help" },
                { label: "Returns", href: "/returns" },
                { label: "Track Order", href: "/track-order" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-light)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-light)")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1.25rem",
            }}>
              Visit Us
            </h6>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                  text: "Bela Industrial Area, Phase 2\nMuzaffarpur, Bihar, India",
                },
                {
                  icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
                  text: "+91 95255 07352",
                  href: "tel:+919525507352",
                },
                {
                  icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
                  text: "info@lakshmanindustries.com",
                  href: "mailto:info@lakshmanindustries.com",
                },
              ].map(({ icon, text, href }, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "rgba(200, 134, 42, 0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "0.1rem",
                  }}>
                    <svg width="14" height="14" fill="currentColor" style={{ color: "var(--amber)" }} viewBox="0 0 24 24">
                      <path d={icon} />
                    </svg>
                  </div>
                  <div style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "var(--muted-light)" }}>
                    {href ? (
                      <a href={href} style={{ color: "var(--muted-light)", transition: "color 0.2s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-light)")}
                      >
                        {text}
                      </a>
                    ) : text.split("\n").map((line, j) => <span key={j} style={{ display: "block" }}>{line}</span>)}
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: "0.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(200, 134, 42, 0.08)",
                border: "1px solid rgba(200, 134, 42, 0.2)",
                borderRadius: 3,
              }}>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
                  Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "1.25rem 2rem",
      }}>
        <div className="container-fluid">
          <div className="row align-items-center" style={{ gap: "0.75rem" }}>
            <div className="col-md-6">
              <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                © {year} Lakshman Industries. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms & Conditions", href: "/terms-conditions" },
                  { label: "Sitemap", href: "/sitemap" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.05em",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
