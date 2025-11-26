// src/components/cart/Cart.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const { items, totalCents, loading, updateQuantity, removeFromCart } =
    useCart();

  // ⭐ Local state for optimistic UI updates
  const [localQuantities, setLocalQuantities] = useState<
    Record<number, number>
  >({});
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  // ⭐ Memoize item count to avoid recalculation
  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => {
      const localQty = localQuantities[item.productId];
      return sum + (localQty !== undefined ? localQty : item.quantity);
    }, 0);
  }, [items, localQuantities]);

  // ⭐ Debounced quantity update
  const handleQuantityChange = async (
    productId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    // Update local state immediately for instant UI feedback
    setLocalQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    setUpdatingItems((prev) => new Set(prev).add(productId));

    // Debounce the API call
    setTimeout(async () => {
      await updateQuantity(productId, newQuantity);
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      // Clear local quantity after successful update
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

  // ⭐ Get effective quantity (local or server)
  const getEffectiveQuantity = (productId: number, serverQuantity: number) => {
    return localQuantities[productId] !== undefined
      ? localQuantities[productId]
      : serverQuantity;
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
              {/* ⭐ Optimized list with virtualization hint */}
              <ul
                className="list-group mb-3"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {items.map((item) => {
                  const effectiveQty = getEffectiveQuantity(
                    item.productId,
                    item.quantity,
                  );
                  const isUpdating = updatingItems.has(item.productId);

                  return (
                    <li
                      key={item.id}
                      className={`list-group-item d-flex justify-content-between align-items-start lh-sm ${isUpdating ? "opacity-75" : ""}`}
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        <Image
                          src={item.product.image || "/images/placeholder.png"}
                          alt={item.product.name || item.product.title}
                          width={50}
                          height={50}
                          className="rounded me-3"
                          loading="lazy"
                        />
                        <div className="flex-grow-1">
                          <h6 className="my-0">
                            {item.product.name || item.product.title}
                          </h6>
                          <small className="text-body-secondary">
                            ₹{(item.product.priceCents / 100).toFixed(2)} each
                          </small>

                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  effectiveQty - 1,
                                )
                              }
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
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  effectiveQty + 1,
                                )
                              }
                              disabled={isUpdating}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="text-body-secondary d-block mb-2">
                          ₹
                          {(
                            (item.product.priceCents * effectiveQty) /
                            100
                          ).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-sm btn-link text-danger p-0 text-black"
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

              <div className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (INR)</span>
                  <strong>₹{(totalCents / 100).toFixed(2)}</strong>
                </li>
              </div>
            </>
          )}

          <Link href="/checkout" className="w-100 btn btn-primary btn-lg mt-3">
            Continue to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
