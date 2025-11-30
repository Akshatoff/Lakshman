"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: number;
  quantity: number;
  priceCents: number;
  product: {
    id: number;
    title: string;
    name: string | null;
    image: string | null;
  };
}

interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: Address | null;
  user: {
    name: string | null;
    email: string | null;
  };
}

const AdminOrdersPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/auth/login?redirectTo=/admin/orders");
        return;
      }

      try {
        const response = await fetch("/api/user/role");
        const data = await response.json();

        if (data.role !== "ADMIN" && data.role !== "admin") {
          alert("Access denied. Admin privileges required.");
          router.push("/");
          return;
        }

        loadOrders();
      } catch (error) {
        console.error("Error checking admin access:", error);
        alert("Error verifying access. Please try again.");
        router.push("/");
      }
    };

    checkAdminAccess();
  }, [user, authLoading, router]);

  const loadOrders = async () => {
    try {
      // This would be a new API endpoint to get ALL orders (admin only)
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await loadOrders();
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  const updateTrackingNumber = async (
    orderId: number,
    trackingNumber: string,
  ) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber }),
      });

      if (response.ok) {
        await loadOrders();
        alert("Tracking number updated successfully!");
        setShowModal(false);
      } else {
        alert("Failed to update tracking number");
      }
    } catch (error) {
      console.error("Error updating tracking:", error);
      alert("Failed to update tracking number");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

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

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Order Management</h1>
              <p className="text-muted mb-0">View and manage customer orders</p>
            </div>
            <div className="d-flex gap-3">
              <Link href="/admin/dashboard" className="btn btn-outline-primary">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid py-4">
        {/* Filters and Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by order #, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select black"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-md-5 text-end">
                <span className="text-muted">
                  Showing {filteredOrders.length} of {orders.length} orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-decoration-none fw-semibold"
                        >
                          #{order.orderNumber}
                        </Link>
                      </td>
                      <td className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div>
                          <div className="fw-semibold">
                            {order.shippingAddress?.fullName || "N/A"}
                          </div>
                          <small className="text-muted">
                            {order.user.email}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <Image
                              key={idx}
                              src={
                                item.product.image || "/images/placeholder.png"
                              }
                              alt={item.product.name || item.product.title}
                              width={30}
                              height={30}
                              className="rounded me-1"
                              style={{
                                marginLeft: idx > 0 ? "-10px" : "0",
                                border: "2px solid white",
                              }}
                            />
                          ))}
                          {order.items.length > 3 && (
                            <span className="badge bg-secondary ms-1">
                              +{order.items.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="fw-semibold">
                        ₹{(order.totalAmount / 100).toFixed(2)}
                      </td>
                      <td>
                        <span className="text-capitalize">
                          {order.paymentMethod === "cod"
                            ? "COD"
                            : order.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`form-select form-select-sm badge ${getStatusBadgeClass(order.status)}`}
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          style={{
                            width: "auto",
                            border: "none",
                            color: "black",
                          }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            href={`/orders/${order.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                          >
                            Track
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-5">
                <svg
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="text-muted mb-3"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                </svg>
                <h5 className="text-muted">No orders found</h5>
                <p className="text-muted">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {showModal && selectedOrder && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Update Tracking - #{selectedOrder.orderNumber}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tracking Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="trackingInput"
                    placeholder="Enter tracking number"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    const input = document.getElementById(
                      "trackingInput",
                    ) as HTMLInputElement;
                    if (input.value) {
                      updateTrackingNumber(selectedOrder.id, input.value);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
