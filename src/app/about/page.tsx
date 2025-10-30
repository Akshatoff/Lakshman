"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <h1 className="display-3 fw-bold mb-4">
                About Lakshman Industries
              </h1>
              <p className="lead mb-4">
                Your trusted partner for premium textiles and quality
                manufacturing in the heart of Bihar&apos;s textile hub.
              </p>
            </div>
            <div className="col-lg-6">
              <Image
                src="/images/banner-3.jpg"
                alt="Lakshman Industries"
                width={600}
                height={400}
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="text-center mb-5 fw-bold">Our Story</h2>
              <p className="lead text-center mb-4">
                Located in Bela Industrial Area, Phase 2, Muzaffarpur - the
                &quot;Litchi Capital of India&quot; - Lakshman Industries stands
                as a beacon of quality textile manufacturing in Bihar.
              </p>
              <p className="text-muted text-center mb-5">
                Strategically positioned just 5 kilometres from Muzaffarpur
                railway station and 12-15 kilometres from Sutapatti market, a
                renowned center for textile sales, especially silk, we&apos;ve
                built our reputation on excellence and innovation.
              </p>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <h4 className="mb-0">Prime Location</h4>
                  </div>
                  <p className="text-muted mb-0">
                    Situated in Bela Industrial Area, developed by BIADA (Bihar
                    Industrial Area Development Authority), we&apos;re at the
                    heart of Bihar&apos;s industrial growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="mb-0">Government Support</h4>
                  </div>
                  <p className="text-muted mb-0">
                    Our textile manufacturing was established with support from
                    the Bihar Udami Yojna, funded by the Bihar Government.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4">What We Manufacture</h2>
              <p className="lead text-muted">
                We specialize in high-quality textile manufacturing, producing a
                wide range of garments for various occasions and purposes.
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-primary"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-2">School Uniforms</h5>
                  <p className="text-muted small mb-0">
                    Durable and comfortable uniforms designed for students
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-success"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-2">Sportswear</h5>
                  <p className="text-muted small mb-0">
                    Performance-focused athletic wear for active lifestyles
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-warning"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-2">Casual Wear</h5>
                  <p className="text-muted small mb-0">
                    Comfortable everyday clothing for all occasions
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-info"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-2">Formal Wear</h5>
                  <p className="text-muted small mb-0">
                    Professional attire for business and formal events
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mx-auto">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div
                    className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-danger"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-2">Occasional Clothing</h5>
                  <p className="text-muted small mb-0">
                    Special garments for celebrations and special events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bela Industrial Area */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">About Bela Industrial Area</h2>
              <p className="text-muted mb-4">
                Bela Industrial Area, developed by BIADA (Bihar Industrial Area
                Development Authority), is famous for several key industries:
              </p>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <strong>1</strong>
                  </div>
                  <div>
                    <h5 className="mb-2">Textile Manufacturing Hub</h5>
                    <p className="text-muted mb-0">
                      A major presence in the area, with several companies
                      producing high-quality garments and contributing to
                      Bihar&apos;s textile growth.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <strong>2</strong>
                  </div>
                  <div>
                    <h5 className="mb-2">Largest Bag Manufacturing Cluster</h5>
                    <p className="text-muted mb-0">
                      Bela is specifically noted for having the largest bag
                      manufacturing cluster in the entire country, making it a
                      significant contributor to India&apos;s manufacturing
                      sector.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Our Heritage</h4>
                  <p className="text-muted mb-3">
                    Before venturing into textile manufacturing, Lakshman
                    Industries established itself as a trusted trading company
                    for Geeken Seating Collection Pvt. Ltd. furniture.
                  </p>
                  <p className="text-muted mb-3">
                    This business foundation still stands strong today. We are
                    now recognized in most government offices and continue to
                    supply quality furniture to these institutions.
                  </p>
                  <div className="alert alert-info mb-0">
                    <strong>
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="me-2"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                      Our dual expertise in furniture and textiles makes us a
                      unique player in Bihar&apos;s industrial landscape.
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4">Why Choose Lakshman Industries?</h2>
              <p className="lead text-muted">
                We combine traditional craftsmanship with modern manufacturing
                techniques to deliver excellence
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div
                    className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <svg
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3">Quality Assurance</h5>
                  <p className="text-muted mb-0">
                    Every product undergoes rigorous quality checks to ensure
                    the highest standards
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <svg
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3">Government Support</h5>
                  <p className="text-muted mb-0">
                    Backed by Bihar Udami Yojna, ensuring sustainable and
                    supported growth
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div
                    className="rounded-circle bg-warning text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <svg
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-3">Diverse Portfolio</h5>
                  <p className="text-muted mb-0">
                    From textiles to furniture, we serve multiple industries
                    with expertise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-lg bg-primary text-white">
            <div className="card-body p-5 text-center">
              <h2 className="fw-bold mb-4">Ready to Experience Quality?</h2>
              <p className="lead mb-4">
                Discover our range of premium textiles and quality products
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link href="/#products" className="btn btn-light btn-lg px-5">
                  Shop Now
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-outline-light btn-lg px-5"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
