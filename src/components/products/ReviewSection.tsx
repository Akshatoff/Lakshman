"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Review {
  id: number;
  rating: number;
  title: string | null;
  comment: string;
  helpful: number;
  isVerified: boolean;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  };
}

interface ReviewSectionProps {
  productId: number;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to write a review");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          ...formData,
        }),
      });

      if (response.ok) {
        await loadReviews();
        setFormData({ rating: 5, title: "", comment: "" });
        setShowForm(false);
        alert("Review submitted successfully!");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  const handleHelpful = async (reviewId: number) => {
    if (!user) {
      alert("Please log in to mark reviews as helpful");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId }),
      });

      if (response.ok) {
        await loadReviews();
      }
    } catch (error) {
      console.error("Error marking helpful:", error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        className={i < rating ? "text-warning" : "text-muted"}
      >
        <path d="M7.953 3.788a.5.5 0 0 0-.906 0L6.08 5.85l-2.154.33a.5.5 0 0 0-.283.843l1.574 1.613l-.373 2.284a.5.5 0 0 0 .736.518l1.92-1.063l1.921 1.063a.5.5 0 0 0 .736-.519l-.373-2.283l1.574-1.613a.5.5 0 0 0-.283-.844L8.921 5.85l-.968-2.062Z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h3 className="mb-4">Customer Reviews</h3>

      {/* Rating Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <h2 className="display-4 mb-0">{averageRating.toFixed(1)}</h2>
              <div className="mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-muted mb-0">{totalReviews} reviews</p>
            </div>
            <div className="col-md-9">
              {user && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Cancel" : "Write a Review"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="mb-3">Write Your Review</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      <svg
                        width="32"
                        height="32"
                        fill={star <= formData.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        className={
                          star <= formData.rating
                            ? "text-warning"
                            : "text-muted"
                        }
                      >
                        <path d="M7.953 3.788a.5.5 0 0 0-.906 0L6.08 5.85l-2.154.33a.5.5 0 0 0-.283.843l1.574 1.613l-.373 2.284a.5.5 0 0 0 .736.518l1.92-1.063l1.921 1.063a.5.5 0 0 0 .736-.519l-.373-2.283l1.574-1.613a.5.5 0 0 0-.283-.844L8.921 5.85l-.968-2.062Z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Title (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Comment *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <div className="mb-1">{renderStars(review.rating)}</div>
                    {review.title && <h6 className="mb-1">{review.title}</h6>}
                    <p className="text-muted small mb-0">
                      By {review.user.name || "Anonymous"} •{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                      {review.isVerified && (
                        <span className="badge bg-success ms-2">
                          Verified Purchase
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <p className="mb-2">{review.comment}</p>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleHelpful(review.id)}
                >
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
