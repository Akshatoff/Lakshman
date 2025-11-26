"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: number;
  quantity: number;
  priceCents: number;
  totalCents: number;
  product: {
    id: number;
    title: string;
    name: string | null;
    image: string | null;
  };
}

interface Address {
  id: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const success = searchParams.get("success");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login?redirectTo=/orders/" + id);
    }
  }, [user, authLoading, router, id]);

  useEffect(() => {
    if (user) {
      loadOrder();
    }
  }, [user, id]);

  const loadOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error("Error loading order:", err);
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-warning";
      case "PROCESSING":
        return "bg-info";
      case "SHIPPED":
        return "bg-primary";
      case "DELIVERED":
        return "bg-success";
      case "CANCELLED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return "bg-success";
      case "PENDING":
        return "bg-warning";
      case "FAILED":
        return "bg-danger";
      case "REFUNDED":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <div
          className="container py-5 text-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Header />
        <div
          className="container py-5 text-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="alert alert-danger">{error || "Order not found"}</div>
          <Link href="/account?tab=orders" className="btn btn-primary">
            View All Orders
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container py-5">
        {/* Success Message */}
        {success === "true" && (
          <div className="alert alert-success alert-dismissible fade show mb-4">
            <h5 className="alert-heading">Order Placed Successfully!</h5>
            <p className="mb-0">
              Thank you for your order. We&apos;ve sent a confirmation email
              with your order details.
            </p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
          </div>
        )}

        {/* Order Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <h2 className="mb-2">Order #{order.orderNumber}</h2>
                <p className="text-muted mb-1">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-end">
                <span
                  className={`badge ${getStatusBadgeClass(order.status)} fs-6 mb-2`}
                >
                  {order.status}
                </span>
                <br />
                <span
                  className={`badge ${getPaymentStatusBadgeClass(order.paymentStatus)} fs-6`}
                >
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Order Items */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Order Items</h5>
              </div>
              <div className="card-body">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                  >
                    <Image
                      src={item.product.image || "/images/placeholder.png"}
                      alt={item.product.name || item.product.title}
                      width={80}
                      height={80}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">
                        {item.product.name || item.product.title}
                      </h6>
                      <p className="text-muted mb-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-muted mb-0">
                        Price: ₹{(item.priceCents / 100).toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-end">
                      <strong>₹{(item.totalCents / 100).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="mt-4 pt-3 border-top">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>₹{(order.subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (GST):</span>
                    <span>₹{(order.tax / 100).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>
                      {order.shipping === 0
                        ? "FREE"
                        : `₹${(order.shipping / 100).toFixed(2)}`}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount:</span>
                      <span>-₹{(order.discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-primary fs-5">
                      ₹{(order.totalAmount / 100).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            {order.notes && (
              <div className="card shadow-sm mt-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Order Notes</h5>
                </div>
                <div className="card-body">
                  <p className="mb-0">{order.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Details Sidebar */}
          <div className="col-lg-4">
            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Tracking Information</h5>
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>Tracking Number:</strong>
                  </p>
                  <p className="text-primary mb-3">{order.trackingNumber}</p>
                  {order.shippedAt && (
                    <p className="text-muted small mb-2">
                      Shipped on:{" "}
                      {new Date(order.shippedAt).toLocaleDateString()}
                    </p>
                  )}
                  {order.deliveredAt && (
                    <p className="text-success small mb-0">
                      Delivered on:{" "}
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Payment Information</h5>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Payment Method:</strong>
                </p>
                <p className="mb-2 text-capitalize">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order.paymentMethod || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Payment Status:</strong>
                </p>
                <span
                  className={`badge ${getPaymentStatusBadgeClass(order.paymentStatus)}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Shipping Address</h5>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{order.shippingAddress.fullName}</strong>
                  </p>
                  <p className="mb-1">{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p className="mb-1">{order.shippingAddress.addressLine2}</p>
                  )}
                  <p className="mb-1">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="mb-1">{order.shippingAddress.country}</p>
                  <p className="mb-0 text-muted">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="card shadow-sm">
              <div className="card-body">
                <Link
                  href="/account?tab=orders"
                  className="btn btn-outline-primary w-100 mb-2"
                >
                  View All Orders
                </Link>
                <Link href="/" className="btn btn-primary w-100">
                  Continue Shopping
                </Link>
                {order.status === "PENDING" && (
                  <button className="btn btn-outline-danger w-100 mt-2">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
