"use client";

import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center">
              {/* 404 Illustration */}
              <div className="mb-4">
                <div className="position-relative d-inline-block">
                  <h1
                    className="display-1 fw-bold text-primary opacity-25"
                    style={{ fontSize: "12rem", lineHeight: "1" }}
                  >
                    404
                  </h1>
                  <div
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{ zIndex: 10 }}
                  >
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-warning"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="h1 fw-bold text-dark mb-3">Page Not Found</h2>

              <p className="lead text-muted mb-4">
                Oops! The page you&apos;re looking for seems to have wandered
                off. It might have been moved, deleted, or you entered the wrong
                URL.
              </p>

              <div className="mb-5">
                <p className="text-muted">
                  Don&apos;t worry, here are some helpful links to get you back
                  on track:
                </p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-5">
                <Link href="/" className="btn btn-primary btn-lg px-4">
                  <svg
                    width="16"
                    height="16"
                    className="me-2"
                    fill="currentColor"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Go Home
                </Link>

                <Link
                  href="/products"
                  className="btn btn-outline-primary btn-lg px-4"
                >
                  <svg
                    width="16"
                    height="16"
                    className="me-2"
                    fill="currentColor"
                  >
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
                  </svg>
                  Browse Products
                </Link>
              </div>

              {/* Popular Categories */}
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h5 className="text-muted mb-3">
                    Or explore our popular categories:
                  </h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <Link
                      href="/category/sofas"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Sofas & Seating
                    </Link>
                    <Link
                      href="/category/beds"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Beds
                    </Link>
                    <Link
                      href="/category/dining"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Dining Tables
                    </Link>
                    <Link
                      href="/category/office"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Office Furniture
                    </Link>
                    <Link
                      href="/category/decor"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Home Decor
                    </Link>
                  </div>
                </div>
              </div>

              {/* Search Box */}
              <div className="mt-5 pt-4 border-top">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <p className="text-muted mb-3">
                      Looking for something specific?
                    </p>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for furniture..."
                        aria-label="Search"
                      />
                      <button className="btn btn-primary" type="button">
                        <svg width="16" height="16" fill="currentColor">
                          <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4">
                <p className="text-muted small">
                  Still need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@lakshman.com"
                    className="text-primary"
                  >
                    support@lakshman.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+91-9525507352" className="text-primary">
                    +91-9525507352
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
