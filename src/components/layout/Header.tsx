"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { user } = useAuth();
  const { itemCount, totalCents } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  type DropdownKey = "clothing" | "sportswear" | "footwear" | "accessories" | "furniture";
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<DropdownKey, boolean>>({
    clothing: false, sportswear: false, footwear: false, accessories: false, furniture: false,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileDropdown = (dropdown: DropdownKey) => {
    setMobileDropdowns((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/signout", { method: "POST" });
      if (res.redirected) window.location.href = res.url;
      else window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openSearch = () => {
    closeMobileMenu();
    setTimeout(() => {
      const el = document.getElementById("offcanvasSearch");
      if (el) new (window as any).bootstrap.Offcanvas(el).show();
    }, 100);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background: "var(--charcoal)",
        color: "var(--cream)",
        textAlign: "center",
        padding: "0.55rem 1rem",
        fontSize: "0.72rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontWeight: 500,
        fontFamily: "var(--font-body)",
      }}>
        Free shipping on orders above ₹1000 &nbsp;·&nbsp; Premium Quality Since 2018
      </div>

      {/* Main Header */}
      <header
        className="sticky-top"
        style={{
          background: "var(--warm-white)",
          borderBottom: "1px solid var(--border)",
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(26,26,26,0.08)" : "none",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center py-3">

            {/* Logo */}
            <div className="col-6 col-md-2">
              <Link href="/" className="d-block" style={{ lineHeight: 0 }}>
                <Image
                  src="/images/logo.png"
                  alt="Laksh-man"
                  width={140}
                  height={36}
                  className="img-fluid"
                  style={{ height: "32px", width: "auto" }}
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="col-md-6 col-lg-6 d-none d-md-flex">
              <nav className="main-menu w-100">
                <ul className="navbar-nav d-flex flex-row gap-4 mb-0 align-items-center">

                  {/* Clothing */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle fw-500" href="#" role="button" data-bs-toggle="dropdown" style={{
                      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--charcoal)", padding: "0.5rem 0", fontFamily: "var(--font-body)",
                    }}>
                      Clothing
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-header" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", padding: "0.5rem 1.25rem 0.25rem", textTransform: "uppercase", fontWeight: 700 }}>Men</li>
                      <li><Link className="dropdown-item" href="/products?category=men-tshirts">T-Shirts</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=men-pants">Pants</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=men-shirts">Shirts</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=men-jackets">Jackets</Link></li>
                      <li><hr className="dropdown-divider" style={{ margin: "0.25rem 1.25rem", borderColor: "var(--border)" }} /></li>
                      <li className="dropdown-header" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", padding: "0.5rem 1.25rem 0.25rem", textTransform: "uppercase", fontWeight: 700 }}>Women</li>
                      <li><Link className="dropdown-item" href="/products?category=women-tshirts">T-Shirts</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=women-pants">Pants</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=women-dresses">Dresses</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=women-skirts">Skirts</Link></li>
                      <li><hr className="dropdown-divider" style={{ margin: "0.25rem 1.25rem", borderColor: "var(--border)" }} /></li>
                      <li className="dropdown-header" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", padding: "0.5rem 1.25rem 0.25rem", textTransform: "uppercase", fontWeight: 700 }}>Kids</li>
                      <li><Link className="dropdown-item" href="/products?category=kids-tshirts">T-Shirts</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=kids-pants">Pants</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=kids-dresses">Dresses</Link></li>
                    </ul>
                  </li>

                  {/* Sportswear */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{
                      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--charcoal)", padding: "0.5rem 0", fontFamily: "var(--font-body)",
                    }}>
                      Sportswear
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href="/products?category=running">Running</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=cricket">Cricket</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=football">Football</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=basketball">Basketball</Link></li>
                    </ul>
                  </li>

                  {/* Footwear */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{
                      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--charcoal)", padding: "0.5rem 0", fontFamily: "var(--font-body)",
                    }}>
                      Footwear
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href="/products?category=sports-shoes">Sports Shoes</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=casual-shoes">Casual Shoes</Link></li>
                    </ul>
                  </li>

                  {/* Accessories */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{
                      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--charcoal)", padding: "0.5rem 0", fontFamily: "var(--font-body)",
                    }}>
                      Accessories
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href="/products?category=cricket-bat">Cricket Bats</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=cricket-ball">Cricket Balls</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=gloves">Gloves</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=backpack">Backpacks</Link></li>
                    </ul>
                  </li>

                  {/* Furniture */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{
                      fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--charcoal)", padding: "0.5rem 0", fontFamily: "var(--font-body)",
                    }}>
                      Furniture
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-header" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", padding: "0.5rem 1.25rem 0.25rem", textTransform: "uppercase", fontWeight: 700 }}>Home</li>
                      <li><Link className="dropdown-item" href="/products?category=home-chairs">Chairs</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=home-tables">Tables</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=home-sofas">Sofas</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=home-beds">Beds</Link></li>
                      <li><hr className="dropdown-divider" style={{ margin: "0.25rem 1.25rem", borderColor: "var(--border)" }} /></li>
                      <li className="dropdown-header" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", color: "var(--muted)", padding: "0.5rem 1.25rem 0.25rem", textTransform: "uppercase", fontWeight: 700 }}>Office</li>
                      <li><Link className="dropdown-item" href="/products?category=office-chairs">Office Chairs</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=office-desks">Desks</Link></li>
                      <li><Link className="dropdown-item" href="/products?category=office-cabinets">Cabinets</Link></li>
                    </ul>
                  </li>

                </ul>
              </nav>
            </div>

            {/* Desktop Search + Actions */}
            <div className="col-md-4 d-none d-md-flex align-items-center justify-content-end gap-3">
              {/* Search */}
              <button
                className="d-flex align-items-center gap-2 border-0 bg-transparent"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
                style={{ color: "var(--charcoal)", cursor: "pointer", transition: "color 0.3s", padding: "0" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--amber)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--charcoal)")}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-3.5-3.5" />
                </svg>
                <span style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.05em", color: "var(--muted)" }}>Search</span>
              </button>

              {/* Divider */}
              <div style={{ width: 1, height: 20, background: "var(--border)" }} />

              {/* User */}
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link p-0 d-flex align-items-center gap-2 text-decoration-none"
                    type="button"
                    data-bs-toggle="dropdown"
                    style={{ color: "var(--charcoal)" }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "var(--charcoal)", color: "var(--cream)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-display)",
                    }}>
                      {user.user_metadata?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" href="/account">My Account</Link></li>
                    <li><Link className="dropdown-item" href="/account?tab=orders">My Orders</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" style={{ color: "#dc2626" }} onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <Link href="/auth/login" style={{
                  fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--charcoal)",
                  borderBottom: "1.5px solid transparent", transition: "all 0.3s",
                  paddingBottom: "2px",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--amber)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--charcoal)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                  }}
                >
                  Sign In
                </Link>
              )}

              {/* Divider */}
              <div style={{ width: 1, height: 20, background: "var(--border)" }} />

              {/* Cart */}
              <button
                className="d-flex align-items-center gap-2 border-0 bg-transparent position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                style={{ color: "var(--charcoal)", cursor: "pointer", transition: "color 0.3s", padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--amber)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--charcoal)")}
              >
                <div className="position-relative">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {itemCount > 0 && (
                    <span style={{
                      position: "absolute", top: "-8px", right: "-8px",
                      background: "var(--amber)", color: "white",
                      width: "18px", height: "18px", borderRadius: "50%",
                      fontSize: "0.65rem", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {itemCount}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--muted)" }}>
                  {itemCount > 0 ? `₹${(totalCents / 100).toFixed(0)}` : "Cart"}
                </span>
              </button>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="col-6 d-md-none d-flex justify-content-end align-items-center gap-3">
              <button
                className="border-0 bg-transparent position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                style={{ color: "var(--charcoal)", padding: 0 }}
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span style={{
                    position: "absolute", top: "-6px", right: "-6px",
                    background: "var(--amber)", color: "white",
                    width: "16px", height: "16px", borderRadius: "50%",
                    fontSize: "0.6rem", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                className="border-0 bg-transparent"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: "var(--charcoal)", padding: 0 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 12h18M3 6h18M3 18h12" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            style={{
              position: "fixed", inset: 0, background: "rgba(26,26,26,0.5)",
              zIndex: 1040, backdropFilter: "blur(4px)",
            }}
            onClick={closeMobileMenu}
          />

          <div style={{
            position: "fixed", top: 0, right: 0, height: "100%",
            width: "min(85%, 380px)", background: "var(--warm-white)",
            zIndex: 1050, overflowY: "auto",
            boxShadow: "-4px 0 40px rgba(26,26,26,0.15)",
            display: "flex", flexDirection: "column",
          }}>
            {/* Mobile header */}
            <div style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <Image src="/images/logo.png" alt="Laksh-man" width={110} height={28} style={{ height: "28px", width: "auto" }} />
              <button onClick={closeMobileMenu} style={{ background: "none", border: "none", color: "var(--charcoal)", cursor: "pointer" }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* User section */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--ivory)" }}>
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "var(--charcoal)", color: "var(--cream)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-display)",
                  }}>
                    {user.user_metadata?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{user.user_metadata?.name || user.email?.split("@")[0]}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{user.email}</div>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login" className="btn btn-primary w-100" onClick={closeMobileMenu} style={{ fontSize: "0.8rem" }}>
                  Sign In / Register
                </Link>
              )}
            </div>

            {/* Search */}
            <div style={{ padding: "0.75rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={openSearch}
                style={{
                  width: "100%", background: "var(--ivory)", border: "1px solid var(--border)",
                  borderRadius: "2px", padding: "0.65rem 1rem",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  color: "var(--muted)", cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5" /></svg>
                Search products...
              </button>
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {([
                { key: "clothing", label: "Clothing", items: [
                  { label: "— Men —", disabled: true },
                  { label: "T-Shirts", href: "/products?category=men-tshirts" },
                  { label: "Pants", href: "/products?category=men-pants" },
                  { label: "Shirts", href: "/products?category=men-shirts" },
                  { label: "Jackets", href: "/products?category=men-jackets" },
                  { label: "— Women —", disabled: true },
                  { label: "T-Shirts", href: "/products?category=women-tshirts" },
                  { label: "Dresses", href: "/products?category=women-dresses" },
                  { label: "Skirts", href: "/products?category=women-skirts" },
                  { label: "— Kids —", disabled: true },
                  { label: "T-Shirts", href: "/products?category=kids-tshirts" },
                  { label: "Pants", href: "/products?category=kids-pants" },
                ]},
                { key: "sportswear", label: "Sportswear", items: [
                  { label: "Running", href: "/products?category=running" },
                  { label: "Cricket", href: "/products?category=cricket" },
                  { label: "Football", href: "/products?category=football" },
                ]},
                { key: "footwear", label: "Footwear", items: [
                  { label: "Sports Shoes", href: "/products?category=sports-shoes" },
                  { label: "Casual Shoes", href: "/products?category=casual-shoes" },
                ]},
                { key: "furniture", label: "Furniture", items: [
                  { label: "— Home —", disabled: true },
                  { label: "Chairs", href: "/products?category=home-chairs" },
                  { label: "Sofas", href: "/products?category=home-sofas" },
                  { label: "Beds", href: "/products?category=home-beds" },
                  { label: "— Office —", disabled: true },
                  { label: "Office Chairs", href: "/products?category=office-chairs" },
                  { label: "Desks", href: "/products?category=office-desks" },
                ]},
              ] as any[]).map(({ key, label, items }) => (
                <div key={key} style={{ borderBottom: "1px solid var(--border)" }}>
                  <button
                    onClick={() => toggleMobileDropdown(key as DropdownKey)}
                    style={{
                      width: "100%", background: "none", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "1rem 1.5rem", cursor: "pointer",
                      fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "var(--charcoal)", fontFamily: "var(--font-body)",
                    }}
                  >
                    {label}
                    <svg width="14" height="14" fill="currentColor" style={{ transform: mobileDropdowns[key as DropdownKey] ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                      <path d="M7 10L1 4h12z" />
                    </svg>
                  </button>
                  {mobileDropdowns[key as DropdownKey] && (
                    <div style={{ background: "var(--ivory)", paddingBottom: "0.5rem" }}>
                      {items.map((item: any, i: number) => (
                        item.disabled ? (
                          <div key={i} style={{ padding: "0.5rem 2rem 0.25rem", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
                            {item.label}
                          </div>
                        ) : (
                          <Link key={i} href={item.href} onClick={closeMobileMenu} style={{
                            display: "block", padding: "0.6rem 2.5rem",
                            fontSize: "0.875rem", color: "var(--charcoal)",
                            transition: "color 0.2s",
                          }}>
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* User links */}
            {user && (
              <div style={{ borderTop: "1px solid var(--border)", padding: "0.5rem 0" }}>
                <Link href="/account" onClick={closeMobileMenu} style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "0.875rem", color: "var(--charcoal)" }}>My Account</Link>
                <Link href="/account?tab=orders" onClick={closeMobileMenu} style={{ display: "block", padding: "0.75rem 1.5rem", fontSize: "0.875rem", color: "var(--charcoal)" }}>My Orders</Link>
                <button onClick={handleLogout} style={{ width: "100%", background: "none", border: "none", textAlign: "left", padding: "0.75rem 1.5rem", fontSize: "0.875rem", color: "#dc2626", cursor: "pointer" }}>
                  Logout
                </button>
              </div>
            )}

            {/* Cart total */}
            <div style={{ padding: "1rem 1.5rem", background: "var(--ivory)", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Cart</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--amber)" }}>
                  ₹{(totalCents / 100).toFixed(2)}
                </span>
              </div>
              <button className="btn btn-primary w-100" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" onClick={closeMobileMenu} style={{ fontSize: "0.78rem" }}>
                View Cart ({itemCount})
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
