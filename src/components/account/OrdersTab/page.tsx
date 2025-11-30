"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export function OrdersTab() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/orders");
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

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status.toLowerCase() === filterStatus.toLowerCase();
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
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title mb-0">My Orders</h4>
          <select
            className="form-select w-auto text-black"
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

        {filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <svg
              width="100"
              height="100"
              className="text-muted mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
            </svg>
            <h5 className="text-muted">
              {filterStatus === "all"
                ? "No orders yet"
                : `No ${filterStatus} orders`}
            </h5>
            <p className="text-muted">
              {filterStatus === "all"
                ? "Start shopping to see your orders here"
                : "Try selecting a different filter"}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
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
                      <span
                        className={`badge ${getStatusBadgeClass(order.status)} text-black`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/orders/${order.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
