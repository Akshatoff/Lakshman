"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const { items, totalCents, loading, updateQuantity, removeFromCart } =
    useCart();

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId: number) => {
    if (confirm("Remove this item from cart?")) {
      await removeFromCart(productId);
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
            <span className="badge bg-primary rounded-pill">
              {items.length}
            </span>
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
              <ul className="list-group mb-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-start lh-sm"
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <Image
                        src={item.product.image || "/images/placeholder.png"}
                        alt={item.product.name || item.product.title}
                        width={50}
                        height={50}
                        className="rounded me-3"
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
                                item.quantity - 1,
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="fw-semibold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1,
                              )
                            }
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
                          (item.product.priceCents * item.quantity) /
                          100
                        ).toFixed(2)}
                      </span>
                      <button
                        className="btn btn-sm btn-link text-danger p-0 text-black"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
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
