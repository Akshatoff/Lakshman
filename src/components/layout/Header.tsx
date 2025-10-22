"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Search from "@/components/search/Search"; // ✅ import your search offcanvas

export default function Header() {
  const { user, loading } = useAuth();
  const { itemCount, totalCents } = useCart();

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
  };

  return (
    <>
      <header>
        {/* Single Row Header */}
        <div className="container-fluid">
          <div className="row py-3 border-bottom align-items-center">
            {/* Logo */}
            <div className="col-6 col-md-2 col-lg-2">
              <div className="main-logo">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Laksh-man Logo"
                    width={120}
                    height={40}
                    className="img-fluid"
                  />
                </Link>
              </div>
            </div>

            {/* Navigation Menu - Desktop */}
            <div className="col-md-4 col-lg-3 d-none d-md-flex">
              <nav className="main-menu d-flex w-100">
                <ul className="navbar-nav d-flex flex-row gap-3 mb-0 w-100 justify-content-start">
                  <li className="nav-item">
                    <Link href="/" className="nav-link px-2">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/#products" className="nav-link px-2">
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about" className="nav-link px-2">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/contact" className="nav-link px-2">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Search Trigger */}
            <div className="col-md-3 col-lg-4 d-none d-md-block">
              <button
                className="search-bar bg-light p-2 rounded-4 d-flex align-items-center border-0 w-100 text-start"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
                aria-controls="offcanvasSearch"
              >
                <span className="text-muted flex-grow-1 ps-2">
                  Search products...
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>

            {/* User Account & Cart */}
            <div className="col-6 col-md-3 col-lg-3 d-flex justify-content-end gap-3 align-items-center">
              {/* User Account */}
              <div className="d-flex align-items-center">
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
                      type="button"
                      id="accountDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          fontSize: "13px",
                        }}
                      >
                        {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                          user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-start ms-2 d-none d-lg-block">
                        <small
                          className="text-muted d-block"
                          style={{ fontSize: "11px" }}
                        >
                          Welcome
                        </small>
                        <span
                          className="text-dark fw-semibold"
                          style={{ fontSize: "13px" }}
                        >
                          {user.user_metadata?.name ||
                            user.email?.split("@")[0]}
                        </span>
                      </div>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="accountDropdown"
                    >
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
                          className="dropdown-item text-danger text-black"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link href="/auth/login" className="text-decoration-none">
                    <div className="d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="ms-2 d-none d-lg-block">
                        <small
                          className="text-muted d-block"
                          style={{ fontSize: "11px" }}
                        >
                          Account
                        </small>
                        <span
                          className="text-dark fw-semibold"
                          style={{ fontSize: "13px" }}
                        >
                          Sign In
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <div className="d-flex align-items-center">
                <Link
                  href="#"
                  className="position-relative text-decoration-none"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {itemCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <div className="ms-2 d-none d-lg-block">
                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "11px" }}
                  >
                    Your Cart
                  </small>
                  <span
                    className="text-dark fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    ₹{(totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="navbar-toggler d-md-none border-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Offcanvas */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* Mobile Search Button */}
            <button
              className="btn btn-outline-dark w-100 mb-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSearch"
              aria-controls="offcanvasSearch"
            >
              Search Products
            </button>

            {/* Mobile Navigation */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#products" className="nav-link">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ✅ Integrated Search Offcanvas */}
      <Search />
    </>
  );
}
