"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Search:", searchQuery);
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="row pt-3 border-bottom">
          {/* Logo Section */}
          <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={150}
                  height={50}
                  className="img-fluid"
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </div>
          </div>

          {/* Search Section */}
          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            <div
              className="search-bar row p-2 my-2 rounded-4"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="col-md-4 d-none d-md-block">
                <select
                  className="form-select border-0 bg-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Children</option>
                </select>
              </div>
              <div className="col-11 col-md-7">
                <form onSubmit={handleSearch} className="text-center">
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Search for men, women, children, wardrobes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              <div className="col-1">
                <button
                  type="submit"
                  className="btn border-0 bg-transparent p-0"
                  onClick={handleSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Support, Icons, Cart */}
          <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <div className="support-box text-end d-none d-xl-block">
              <span className="fs-6 text">For Support?</span>
              <h6 className="mb-0 text-black fs-5 fw-bold">+91-9525507352</h6>
            </div>

            <ul className="d-flex justify-content-end list-unstyled m-0">
              <li>
                <Link
                  href="/account"
                  className="rounded-circle bg-light p-2 mx-1"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlinkHref="#user"></use>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="rounded-circle bg-light p-2 mx-1"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlinkHref="#heart"></use>
                  </svg>
                </Link>
              </li>
              <li className="d-lg-none">
                <button
                  className="rounded-circle bg-light p-2 mx-1 border-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlinkHref="#cart"></use>
                  </svg>
                </button>
              </li>
              <li className="d-lg-none">
                <button
                  className="rounded-circle bg-light p-2 mx-1 border-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSearch"
                  aria-controls="offcanvasSearch"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <use xlinkHref="#search"></use>
                  </svg>
                </button>
              </li>
            </ul>

            <div className="cart text-end d-none d-lg-block dropdown">
              <button
                className="border-0 bg-transparent d-flex flex-column gap-2 lh-1"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart"
              >
                <span className="fs-6 dropdown-toggle">
                  Your Cart ({cartCount})
                </span>
                <span className="cart-total fs-5 fw-bold">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
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
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
