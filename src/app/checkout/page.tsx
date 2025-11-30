"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Address {
  id: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { items, totalCents, clearCart } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Address states
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirectTo=/checkout");
      return;
    }
    if (items.length === 0) {
      router.push("/");
      return;
    }

    fetchAddresses();
  }, [user, items, router]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/addresses");
      if (response.ok) {
        const data = await response.json();
        setSavedAddresses(data.addresses || []);

        const defaultAddress = data.addresses?.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSaveNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSavedAddresses([...savedAddresses, data.address]);
        setSelectedAddressId(data.address.id);
        setShowNewAddressForm(false);

        setFormData({
          fullName: "",
          phone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
          country: "India",
        });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) {
      alert("Please select a delivery address");
      return;
    }

    setIsLoading(true);

    try {
      const subtotal = totalCents;
      const shipping = 0;
      const tax = Math.round(totalCents * 0.18);
      const total = subtotal + shipping + tax;

      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceCents: item.product.priceCents,
        })),
        shippingAddressId: selectedAddressId,
        billingAddressId: selectedAddressId,
        subtotal,
        tax,
        shipping,
        totalAmount: total,
        paymentMethod: "cod",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      const { order } = await response.json();

      // Clear cart and redirect to success page
      await clearCart();
      router.push(`/orders/${order.id}?success=true`);
    } catch (error: any) {
      console.error("Order creation failed:", error);
      alert(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  const subtotal = totalCents;
  const shipping = 0;
  const tax = Math.round(totalCents * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Checkout</h2>

                {/* Address Section */}
                <div className="mb-4">
                  <h3 className="mb-3">Delivery Address</h3>

                  {savedAddresses.length > 0 && !showNewAddressForm ? (
                    <>
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          className={`card mb-3 ${selectedAddressId === address.id ? "border-primary border-2" : ""}`}
                          onClick={() => setSelectedAddressId(address.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-body">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.id}
                                onChange={() => setSelectedAddressId(address.id)}
                              />
                              <label className="form-check-label">
                                <strong>{address.fullName}</strong>
                                {address.isDefault && (
                                  <span className="badge bg-primary ms-2">Default</span>
                                )}
                              </label>
                            </div>
                            <p className="mb-1 mt-2">
                              {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                            </p>
                            <p className="mb-1">
                              {address.city}, {address.state} - {address.zipCode}
                            </p>
                            <p className="mb-0 text-muted">Phone: {address.phone}</p>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-outline-primary mb-3"
                        onClick={() => setShowNewAddressForm(true)}
                      >
                        + Add New Address
                      </button>
                    </>
                  ) : (
                    <div className="mb-3">
                      <h5 className="mb-3">Add New Address</h5>
                      <form onSubmit={handleSaveNewAddress}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name *"
                              value={formData.fullName}
                              onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Phone Number *"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address Line 1 *"
                              value={formData.addressLine1}
                              onChange={(e) =>
                                setFormData({ ...formData, addressLine1: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address Line 2 (Optional)"
                              value={formData.addressLine2}
                              onChange={(e) =>
                                setFormData({ ...formData, addressLine2: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City *"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="State *"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({ ...formData, state: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-md-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="PIN Code *"
                              value={formData.zipCode}
                              onChange={(e) =>
                                setFormData({ ...formData, zipCode: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary me-2"
                              disabled={isLoading}
                            >
                              {isLoading ? "Saving..." : "Save Address"}
                            </button>
                            {savedAddresses.length > 0 && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowNewAddressForm(false)}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                {/* Payment Method - Only COD */}
                <div className="mb-4">
                  <h3 className="mb-3">Payment Method</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="fs-4 me-3">💵</span>
                        <div>
                          <h5 className="mb-0">Cash on Delivery</h5>
                          <small className="text-muted">Pay when you receive your order</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="btn btn-primary btn-lg w-100"
                  disabled={!selectedAddressId || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - ₹${(total / 100).toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-body">
                <h4 className="card-title mb-4">Order Summary</h4>

                <div className="mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {items.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-3">
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.product.title}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span className="fw-semibold">
                        ₹{((item.product.priceCents * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{(subtotal / 100).toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (GST 18%)</span>
                  <span>₹{(tax / 100).toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">₹{(total / 100).toFixed(2)}</strong>
                </div>

                <div className="alert alert-info small mb-0">
                  <strong>✓ Secure Checkout</strong>
                  <br />
                  Pay safely when you receive your order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
