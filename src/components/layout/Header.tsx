"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { user, loading } = useAuth();
  const { itemCount, totalCents } = useCart();

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/signout", {
        method: "POST",
      });

      // Redirect is already handled in the API route
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
    <header>
      {/* Top Bar */}
      <div className="container-fluid">
        <div className="row py-3 border-bottom">
          <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Laksh-man Logo"
                  width={150}
                  height={50}
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>

          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <div className="search-bar row bg-light p-2 rounded-4">
              <div className="col-md-4 d-none d-md-block">
                <select className="form-select border-0 bg-transparent">
                  <option>All Categories</option>
                  <option>Furniture</option>
                  <option>Home Decor</option>
                  <option>Office</option>
                </select>
              </div>
              <div className="col-11 col-md-7">
                <form
                  id="search-form"
                  className="text-center"
                  action=""
                  method="post"
                >
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Search products..."
                  />
                </form>
              </div>
              <div className="col-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <use href="#search" />
                </svg>
              </div>
            </div>
          </div>

          <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
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
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: "35px",
                        height: "35px",
                        fontSize: "14px",
                      }}
                    >
                      {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-start d-none d-lg-block">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "12px" }}
                      >
                        Welcome
                      </small>
                      <span
                        className="text-dark fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        {user.user_metadata?.name || user.email?.split("@")[0]}
                      </span>
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="accountDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" href="/account">
                        <svg
                          width="16"
                          height="16"
                          className="me-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/account?tab=orders"
                      >
                        <svg
                          width="16"
                          height="16"
                          className="me-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                        </svg>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger text-black"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          className="me-2"
                          fill="#000"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
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
                    >
                      <use href="#user" />
                    </svg>
                    <div className="ms-2 d-none d-lg-block">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "12px" }}
                      >
                        Account
                      </small>
                      <span
                        className="text-dark fw-semibold"
                        style={{ fontSize: "14px" }}
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
                >
                  <use href="#cart" />
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
                  style={{ fontSize: "12px" }}
                >
                  Your Cart
                </small>
                <span
                  className="text-dark fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  ₹{(totalCents / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container-fluid">
        <div className="row py-3">
          <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
            <nav className="main-menu d-flex navbar navbar-expand-lg">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header justify-content-center">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li className="nav-item active">
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
