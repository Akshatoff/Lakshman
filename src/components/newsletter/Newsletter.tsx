"use client";

import React, { useState } from "react";

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subscribe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage(
        "Thank you for subscribing! Check your email for your discount code.",
      );
      setFormData({ name: "", email: "", subscribe: false });
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div
          className="bg-secondary py-5 my-5 rounded-5"
          style={{
            background: "url('/images/bg-leaves-img-pattern.png') no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container my-5">
            <div className="row align-items-center">
              <div className="col-md-6 p-5">
                <div className="section-header">
                  <h2 className="section-title display-4 fw-bold font-nunito text-black">
                    Get <span className="text-primary">25% Discount</span> on
                    your first purchase
                  </h2>
                </div>
                <p className="text-black">
                  Unlock an exclusive 25% discount on your first order! Shop now
                  and enjoy incredible savings on our premium furniture
                  collection. Don&apos;t miss out—this special offer is only
                  available for a limited time. Start your journey to savings
                  today!
                </p>
              </div>
              <div className="col-md-6 p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-black">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-black">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="abc@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-check form-check-inline mb-3">
                    <input
                      className="form-check-input border-black"
                      type="checkbox"
                      name="subscribe"
                      id="subscribe"
                      checked={formData.subscribe}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label text-black"
                      htmlFor="subscribe"
                    >
                      Subscribe to the newsletter for updates and exclusive
                      offers
                    </label>
                  </div>

                  {message && (
                    <div
                      className={`alert ${
                        message.includes("Thank you")
                          ? "alert-success"
                          : "alert-danger"
                      } mb-3`}
                    >
                      {message}
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting...
                        </>
                      ) : (
                        "Get My Discount"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
