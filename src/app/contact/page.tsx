"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
              <p className="lead">
                We&apos;d love to hear from you. Contact us for inquiries about
                our products, bulk orders, or any assistance you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-4">Contact Information</h3>

                  {/* Address */}
                  <div className="mb-4">
                    <div className="d-flex align-items-start">
                      <div
                        className="bg-primary bg-opacity-10 rounded p-3 me-3"
                        style={{ minWidth: "48px" }}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-primary"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Our Location</h5>
                        <p className="text-muted mb-0">
                          Bela Industrial Area, Phase 2<br />
                          Muzaffarpur, Bihar, India
                          <br />5 km from Muzaffarpur Railway Station
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <div className="d-flex align-items-start">
                      <div
                        className="bg-success bg-opacity-10 rounded p-3 me-3"
                        style={{ minWidth: "48px" }}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-success"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Phone</h5>
                        <p className="text-muted mb-0">
                          <a
                            href="tel:+919525507352"
                            className="text-decoration-none text-muted"
                          >
                            +91 95255 07352
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <div className="d-flex align-items-start">
                      <div
                        className="bg-info bg-opacity-10 rounded p-3 me-3"
                        style={{ minWidth: "48px" }}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-info"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Email</h5>
                        <p className="text-muted mb-0">
                          <a
                            href="mailto:info@lakshmanindustries.com"
                            className="text-decoration-none text-muted"
                          >
                            info@lakshmanindustries.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <div className="d-flex align-items-start">
                      <div
                        className="bg-warning bg-opacity-10 rounded p-3 me-3"
                        style={{ minWidth: "48px" }}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="text-warning"
                        >
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Business Hours</h5>
                        <p className="text-muted mb-1">
                          Monday - Saturday: 9:00 AM - 7:00 PM
                        </p>
                        <p className="text-muted mb-0">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h3 className="h4 fw-bold mb-4">Send us a Message</h3>

                  {submitted && (
                    <div className="alert alert-success" role="alert">
                      <svg
                        width="16"
                        height="16"
                        className="me-2"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Thank you for contacting us! We&apos;ll get back to you
                      soon.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="phone"
                          className="form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 1234567890"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="subject"
                          className="form-label fw-semibold"
                        >
                          Subject *
                        </label>
                        <select
                          className="form-select form-select-lg"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="product-inquiry">
                            Product Inquiry
                          </option>
                          <option value="bulk-order">Bulk Order Request</option>
                          <option value="custom-furniture">
                            Custom Furniture
                          </option>
                          <option value="complaint">Complaint/Issue</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="message"
                          className="form-label fw-semibold"
                        >
                          Message *
                        </label>
                        <textarea
                          className="form-control form-control-lg"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          required
                          placeholder="Tell us about your inquiry..."
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg px-5"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="me-2"
                              >
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                              </svg>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h4 fw-bold mb-4 text-center">Find Us on Map</h3>
              <div className="ratio ratio-21x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.123!2d85.3903!3d26.1264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzM1LjAiTiA4NcKwMjMnMjUuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lakshman Industries Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h3 className="h3 fw-bold mb-3">About Lakshman Industries</h3>
              <p className="lead text-muted mb-4">
                Located in the heart of Bela Industrial Area, Muzaffarpur - the
                &quot;Litchi Capital of India&quot;, Lakshman Industries is a
                leading manufacturer of premium textiles and furniture.
              </p>
              <div className="row g-4 text-start">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-semibold">Quality Products</h5>
                      <p className="text-muted">
                        We manufacture school uniforms, sportswear, casual wear,
                        formal wear, and premium furniture.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-success"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-semibold">Strategic Location</h5>
                      <p className="text-muted">
                        Located in Bihar&apos;s largest bag manufacturing
                        cluster, easily accessible from Muzaffarpur station.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-info"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-semibold">Government Support</h5>
                      <p className="text-muted">
                        Started with Bihar Udami Yojna funding, supporting
                        Bihar&apos;s textile growth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-warning"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="fw-semibold">Trusted Partner</h5>
                      <p className="text-muted">
                        Supplier of Geeken seating collection furniture to
                        government offices across Bihar.
                      </p>
                    </div>
                  </div>
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
