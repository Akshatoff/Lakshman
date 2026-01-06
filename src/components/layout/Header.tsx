"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const dropdownStyles = `
  .dropdown-submenu {
    position: relative;
  }

  .dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
  }

  .dropdown-submenu:hover > .dropdown-menu {
    display: block;
  }

  .dropdown-item.dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.5em;
    vertical-align: 0.1em;
    content: "›";
    border: none;
    font-size: 1.2em;
    transform: rotate(0deg);
  }

  @media (max-width: 767px) {
    .dropdown-submenu .dropdown-menu {
      position: static;
      float: none;
      width: 100%;
      margin-left: 0;
      box-shadow: none;
      border: none;
    }
  }
`;

export default function Header() {
  const { user, loading } = useAuth();
  const { itemCount, totalCents } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  type DropdownKey =
    | "clothing"
    | "sportswear"
    | "footwear"
    | "accessories"
    | "furniture";

  const [mobileDropdowns, setMobileDropdowns] = useState<
    Record<DropdownKey, boolean>
  >({
    clothing: false,
    sportswear: false,
    footwear: false,
    accessories: false,
    furniture: false,
  });

  const toggleMobileDropdown = (dropdown: DropdownKey) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/signout", {
        method: "POST",
      });
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openSearch = () => {
    closeMobileMenu();
    setTimeout(() => {
      const searchOffcanvas = document.getElementById("offcanvasSearch");
      if (searchOffcanvas) {
        const bsOffcanvas = new (window as any).bootstrap.Offcanvas(
          searchOffcanvas,
        );
        bsOffcanvas.show();
      }
    }, 100);
  };

  return (
    <>
      <style>{dropdownStyles}</style>
      <header
        className="bg-white border-bottom sticky-top"
        style={{ zIndex: 1030 }}
      >
        <div className="container-fluid">
          <div className="row py-3 align-items-center">
            {/* Logo */}
            <div className="col-6 col-md-2">
              <Link href="/" className="d-block">
                <Image
                  src="/images/logo.png"
                  alt="Lakshman Logo"
                  width={150}
                  height={30}
                  className="img-fluid"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="col-md-6 col-lg-6 d-none d-md-flex">
              <nav className="main-menu w-100">
                <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
                  {/* Clothing Dropdown with Subcategories */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Clothing
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Men
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=men-tshirts"
                            >
                              T-Shirts
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=men-pants"
                            >
                              Pants
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=men-shirts"
                            >
                              Shirts
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=men-jackets"
                            >
                              Jackets
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Women
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=women-tshirts"
                            >
                              T-Shirts
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=women-pants"
                            >
                              Pants
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=women-dresses"
                            >
                              Dresses
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=women-skirts"
                            >
                              Skirts
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Kids
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=kids-tshirts"
                            >
                              T-Shirts
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=kids-pants"
                            >
                              Pants
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=kids-dresses"
                            >
                              Dresses
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=kids-sets"
                            >
                              Sets
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  {/* Sportswear Dropdown */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sportswear
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=running"
                        >
                          Running
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=cricket"
                        >
                          Cricket
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=football"
                        >
                          Football
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=basketball"
                        >
                          Basketball
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Footwear Dropdown */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Footwear
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=sports-shoes"
                        >
                          Sports Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=casual-shoes"
                        >
                          Casual Shoes
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Accessories Dropdown */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Accessories
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=cricket-bat"
                        >
                          Bats
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=cricket-ball"
                        >
                          Balls
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=gloves"
                        >
                          Gloves
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/products?category=backpack"
                        >
                          Backpacks
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Furniture Dropdown with Subcategories */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Furniture
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Home Furniture
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=home-chairs"
                            >
                              Chairs
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=home-tables"
                            >
                              Tables
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=home-sofas"
                            >
                              Sofas
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=home-beds"
                            >
                              Beds
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=home-storage"
                            >
                              Storage
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown-submenu">
                        <a className="dropdown-item dropdown-toggle" href="#">
                          Office Furniture
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=office-chairs"
                            >
                              Office Chairs
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=office-desks"
                            >
                              Desks
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=office-cabinets"
                            >
                              Cabinets
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=office-tables"
                            >
                              Conference Tables
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/products?category=office-storage"
                            >
                              Storage Solutions
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Desktop Search */}
            <div className="col-md-2 d-none d-md-block">
              <button
                className="search-bar bg-light p-2 rounded-4 d-flex align-items-center border-0 w-100 text-start"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
              >
                <span className="text-muted flex-grow-1 ps-2 small">
                  Search...
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Desktop User & Cart */}
            <div className="col-md-2 d-none d-md-flex justify-content-end gap-3 align-items-center">
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" href="/account">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/account?tab=orders"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="btn btn-outline-primary btn-sm"
                >
                  Sign In
                </Link>
              )}

              <button
                className="btn btn-link position-relative p-0"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="col-6 d-md-none d-flex justify-content-end align-items-center gap-3">
              <button
                className="btn btn-link position-relative p-0"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    style={{ fontSize: "10px" }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                className="btn btn-link p-0 text-dark"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Add subcategories here as well */}
      {mobileMenuOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
            style={{ zIndex: 1040 }}
            onClick={closeMobileMenu}
          />

          <div
            className="position-fixed top-0 end-0 h-100 bg-white d-md-none overflow-auto"
            style={{
              width: "85%",
              maxWidth: "400px",
              zIndex: 1050,
              boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="mb-0 fw-bold">Menu</h5>
              <button
                className="btn btn-link p-0 text-dark"
                onClick={closeMobileMenu}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Section */}
            <div className="p-3 border-bottom bg-light">
              {user ? (
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px", fontSize: "20px" }}
                  >
                    {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-semibold">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </div>
                    <small className="text-muted">{user.email}</small>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="btn btn-primary w-100"
                  onClick={closeMobileMenu}
                >
                  Sign In / Register
                </Link>
              )}
            </div>

            {/* Mobile Search Button */}
            <div className="p-3 border-bottom">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={openSearch}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span>Search Products</span>
              </button>
            </div>

            {/* Mobile Navigation - Add subcategories handling here */}
            <div className="py-2">
              {/* Clothing with subcategories in mobile */}
              <div className="border-bottom">
                <button
                  className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                  onClick={() => toggleMobileDropdown("clothing")}
                >
                  <span className="fw-semibold">Clothing</span>
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    style={{
                      transform: mobileDropdowns.clothing
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
                {mobileDropdowns.clothing && (
                  <div className="bg-light">
                    <div className="px-4 py-2 fw-semibold text-muted">Men</div>
                    <Link
                      href="/products?category=men-tshirts"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      T-Shirts
                    </Link>
                    <Link
                      href="/products?category=men-pants"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Pants
                    </Link>
                    <Link
                      href="/products?category=men-shirts"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Shirts
                    </Link>

                    <div className="px-4 py-2 fw-semibold text-muted mt-2">
                      Women
                    </div>
                    <Link
                      href="/products?category=women-tshirts"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      T-Shirts
                    </Link>
                    <Link
                      href="/products?category=women-pants"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Pants
                    </Link>
                    <Link
                      href="/products?category=women-dresses"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Dresses
                    </Link>

                    <div className="px-4 py-2 fw-semibold text-muted mt-2">
                      Kids
                    </div>
                    <Link
                      href="/products?category=kids-tshirts"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      T-Shirts
                    </Link>
                    <Link
                      href="/products?category=kids-pants"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Pants
                    </Link>
                    <Link
                      href="/products?category=kids-dresses"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Dresses
                    </Link>
                  </div>
                )}
              </div>

              {/* Furniture with subcategories in mobile */}
              <div className="border-bottom">
                <button
                  className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                  onClick={() => toggleMobileDropdown("furniture")}
                >
                  <span className="fw-semibold">Furniture</span>
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    style={{
                      transform: mobileDropdowns.furniture
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
                {mobileDropdowns.furniture && (
                  <div className="bg-light">
                    <div className="px-4 py-2 fw-semibold text-muted">
                      Home Furniture
                    </div>
                    <Link
                      href="/products?category=home-chairs"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Chairs
                    </Link>
                    <Link
                      href="/products?category=home-tables"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Tables
                    </Link>
                    <Link
                      href="/products?category=home-sofas"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Sofas
                    </Link>
                    <Link
                      href="/products?category=home-beds"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Beds
                    </Link>

                    <div className="px-4 py-2 fw-semibold text-muted mt-2">
                      Office Furniture
                    </div>
                    <Link
                      href="/products?category=office-chairs"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Office Chairs
                    </Link>
                    <Link
                      href="/products?category=office-desks"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Desks
                    </Link>
                    <Link
                      href="/products?category=office-cabinets"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Cabinets
                    </Link>
                    <Link
                      href="/products?category=office-tables"
                      className="d-block px-5 py-2"
                      onClick={closeMobileMenu}
                    >
                      Conference Tables
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {user && (
              <div className="py-2 border-top">
                <Link
                  href="/account"
                  className="d-block px-3 py-3"
                  onClick={closeMobileMenu}
                >
                  My Account
                </Link>
                <Link
                  href="/account?tab=orders"
                  className="d-block px-3 py-3"
                  onClick={closeMobileMenu}
                >
                  My Orders
                </Link>
                <button
                  className="d-block w-100 px-3 py-3 text-start border-0 bg-white text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}

            <div className="p-3 bg-light border-top mt-auto">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">Cart Total:</span>
                <span className="fw-bold text-primary">
                  ₹{(totalCents / 100).toFixed(2)}
                </span>
              </div>
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                onClick={closeMobileMenu}
              >
                View Cart ({itemCount})
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
