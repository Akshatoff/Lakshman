"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductTabs from "@/components/products/ProductTabs";
import Cart from "@/components/cart/Cart";
import Search from "@/components/search/Search";
import Newsletter from "@/components/newsletter/Newsletter";
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.time("fetchProducts");
        const response = await fetch("/api/products?limit=100");
        const result = await response.json();
        console.timeEnd("fetchProducts");

        if (result.success) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

    // Remove preloader after component mounts
    const timer = setTimeout(() => {
      const preloader = document.querySelector(
        ".preloader-wrapper",
      ) as HTMLElement;
      if (preloader) {
        preloader.style.display = "none";
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SVG Icons */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="link"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 19a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm0-4a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm-5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm7-12h-1V2a1 1 0 0 0-2 0v1H8V2a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V6a1 1 0 0 1 1-1h1v1a1 1 0 0 0 2 0V5h8v1a1 1 0 0 0 2 0V5h1a1 1 0 0 1 1 1ZM7 15a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm0 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="arrow-right"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.92 11.62a1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="heart"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="plus"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="minus"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="cart"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="star-solid"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M7.953 3.788a.5.5 0 0 0-.906 0L6.08 5.85l-2.154.33a.5.5 0 0 0-.283.843l1.574 1.613l-.373 2.284a.5.5 0 0 0 .736.518l1.92-1.063l1.921 1.063a.5.5 0 0 0 .736-.519l-.373-2.283l1.574-1.613a.5.5 0 0 0-.283-.844L8.921 5.85l-.968-2.062Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="search"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="user"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="check"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39l8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="check-circle"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Zm4.71-10.29l-5 5a1 1 0 0 1-1.42 0l-2-2a1 1 0 0 1 1.42-1.42L11 12.59l4.29-4.3a1 1 0 0 1 1.42 1.42Z"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="shopping-cart"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
            />
          </symbol>
        </defs>
      </svg>

      <Preloader />
      <Cart />
      <Search />

      <Header />

      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Products Section */}
      <section className="" id="products">
        <div className="container-fluid">
          <ProductTabs products={products} />
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Support Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1">Free Delivery</h5>
                  <p className="mb-0 text-muted">For orders above ₹1000</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1">24/7 Support</h5>
                  <p className="mb-0 text-muted">Customer service available</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1">Easy Returns</h5>
                  <p className="mb-0 text-muted">30-day return policy</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1">Secure Payment</h5>
                  <p className="mb-0 text-muted">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
