"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Cart: React.FC = () => {
  const { items, totalCents, loading, updateQuantity, removeFromCart, isGuest } = useCart();
  const { user } = useAuth();

  const [localQuantities, setLocalQuantities] = useState<Record<number, number>>({});
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => {
      const localQty = localQuantities[item.productId];
      return sum + (localQty !== undefined ? localQty : item.quantity);
    }, 0);
  }, [items, localQuantities]);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setLocalQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    setUpdatingItems((prev) => new Set(prev).add(productId));

    setTimeout(async () => {
      await updateQuantity(productId, newQuantity);
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setLocalQuantities((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }, 500);
  };

  const handleRemove = async (productId: number) => {
    if (confirm("Remove this item from cart?")) {
      await removeFromCart(productId);
    }
  };

  const getEffectiveQuantity = (productId: number, serverQuantity: number) => {
    return localQuantities[productId] !== undefined
      ? localQuantities[productId]
      : serverQuantity;
  };

  // For guests: close offcanvas and redirect to login
  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      // Close offcanvas
      const offcanvas = document.getElementById("offcanvasCart");
      if (offcanvas) {
        const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
      setTimeout(() => {
        window.location.href = "/auth/login?redirectTo=/checkout";
      }, 150);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex={-1}
      id="offcanvasCart"
      aria-labelledby="My Cart"
    >
      <div className="offcanvas-header justify-content-center">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{itemCount}</span>
          </h4>

          {/* Guest notice */}
          {isGuest && items.length > 0 && (
            <div
              className="alert mb-3 d-flex align-items-center gap-2"
              style={{
                background: "#fdf3e0",
                border: "1px solid #f0c868",
                borderRadius: 4,
                fontSize: "0.82rem",
                color: "#7a5c0a",
                padding: "0.6rem 0.85rem",
              }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              Sign in to save your cart &amp; checkout
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-muted mb-3"
              >
                <path d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z" />
              </svg>
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            <>
              <ul
                className="list-group mb-3"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {items.map((item) => {
                  const effectiveQty = getEffectiveQuantity(item.productId, item.quantity);
                  const isUpdating = updatingItems.has(item.productId);

                  return (
                    <li
                      key={item.id}
                      className={`list-group-item d-flex justify-content-between align-items-start lh-sm ${isUpdating ? "opacity-75" : ""}`}
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name || item.product.title}
                            width={50}
                            height={50}
                            className="rounded me-3"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="rounded me-3 bg-light d-flex align-items-center justify-content-center"
                            style={{ width: 50, height: 50, flexShrink: 0 }}
                          >
                            <svg width="20" height="20" fill="currentColor" className="text-muted" viewBox="0 0 24 24">
                              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <h6 className="my-0">
                            {item.product.name || item.product.title}
                          </h6>
                          <small className="text-body-secondary">
                            {item.product.priceCents > 0
                              ? `₹${(item.product.priceCents / 100).toFixed(2)} each`
                              : "Price unavailable"}
                          </small>

                          <div className="d-flex align-items-center gap-2 mt-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.productId, effectiveQty - 1)}
                              disabled={effectiveQty <= 1 || isUpdating}
                            >
                              -
                            </button>
                            <span className="fw-semibold">
                              {effectiveQty}
                              {isUpdating && (
                                <span className="spinner-border spinner-border-sm ms-1" />
                              )}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.productId, effectiveQty + 1)}
                              disabled={isUpdating}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="text-body-secondary d-block mb-2">
                          {item.product.priceCents > 0
                            ? `₹${((item.product.priceCents * effectiveQty) / 100).toFixed(2)}`
                            : "—"}
                        </span>
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={() => handleRemove(item.productId)}
                          disabled={isUpdating}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalCents > 0 && (
                <div className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (INR)</span>
                    <strong>₹{(totalCents / 100).toFixed(2)}</strong>
                  </li>
                </div>
              )}
            </>
          )}

          {/* Checkout button — works for both guest and logged-in */}
          <a
            href="/checkout"
            className="w-100 btn btn-primary btn-lg mt-3"
            onClick={handleCheckout}
            data-bs-dismiss={user ? "offcanvas" : undefined}
          >
            {user ? "Continue to checkout" : "Sign in to checkout"}
          </a>

          {/* Sign in shortcut for guests with items */}
          {isGuest && items.length > 0 && (
            <a
              href="/auth/login?redirectTo=/checkout"
              className="w-100 btn btn-outline-secondary mt-2"
              data-bs-dismiss="offcanvas"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
