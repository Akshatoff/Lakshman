"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="py-5 bg-dark text-white">
      <div className="container-fluid">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-widget">
              <div className="main-logo mb-4">
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
              <p className="text-light">
                Your trusted partner for premium furniture and home decor.
                We provide quality products that transform your living spaces
                into beautiful, functional environments.
              </p>
              <div className="social-links d-flex gap-3 mt-3">
                <Link href="#" className="text-white">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.012 0z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-widget">
              <h5 className="widget-title text-white mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link href="/" className="text-light text-decoration-none">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/products" className="text-light text-decoration-none">
                    Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/categories" className="text-light text-decoration-none">
                    Categories
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="text-light text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="text-light text-decoration-none">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-widget">
              <h5 className="widget-title text-white mb-3">Categories</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link href="/category/sofas" className="text-light text-decoration-none">
                    Sofas & Seating
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/category/beds" className="text-light text-decoration-none">
                    Beds
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/category/dining" className="text-light text-decoration-none">
                    Dining Tables
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/category/office" className="text-light text-decoration-none">
                    Office Furniture
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/category/decor" className="text-light text-decoration-none">
                    Home Decor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-widget">
              <h5 className="widget-title text-white mb-3">Customer Service</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link href="/help" className="text-light text-decoration-none">
                    Help Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/returns" className="text-light text-decoration-none">
                    Returns & Exchanges
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/shipping" className="text-light text-decoration-none">
                    Shipping Info
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/warranty" className="text-light text-decoration-none">
                    Warranty
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/track-order" className="text-light text-decoration-none">
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-widget">
              <h5 className="widget-title text-white mb-3">Contact Info</h5>
              <div className="contact-info">
                <div className="d-flex align-items-start mb-3">
                  <svg width="20" height="20" fill="currentColor" className="me-3 mt-1" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <p className="text-light mb-0">
                      123 Furniture Street,<br />
                      Design City, DC 12345
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <svg width="20" height="20" fill="currentColor" className="me-3" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <p className="text-light mb-0">+91-9525507352</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <svg width="20" height="20" fill="currentColor" className="me-3" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <p className="text-light mb-0">info@lakshman.com</p>
                </div>
                <div className="d-flex align-items-center">
                  <svg width="20" height="20" fill="currentColor" className="me-3" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <p className="text-light mb-0">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <hr className="my-4" style={{ borderColor: "#555" }} />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light mb-0">
              © {new Date().getFullYear()} Laksh-man Furniture. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <div className="footer-links d-flex justify-content-md-end gap-4">
              <Link href="/privacy-policy" className="text-light text-decoration-none">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-light text-decoration-none">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-light text-decoration-none">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
