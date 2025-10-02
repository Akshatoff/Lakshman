"use client";

import React from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  total: number;
}

const Cart: React.FC<CartProps> = ({ items, total }) => {
  const handleCheckout = () => {
    // Handle checkout logic
    console.log("Proceeding to checkout with items:", items);
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

          {items.length === 0 ? (
            <div className="text-center py-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-muted mb-3"
              >
                <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5a1 1 0 0 1 0 2h-1v13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6H2a1 1 0 0 1 0-2h5ZM6 6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6H6ZM9 4h6V2H9v2Z" />
              </svg>
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            <>
              <ul className="list-group mb-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={`/${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded me-3"
                      />
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-body-secondary">
                          Qty: {item.quantity}
                        </small>
                      </div>
                    </div>
                    <span className="text-body-secondary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹{total.toLocaleString()}</strong>
              </li>
            </>
          )}

          <button
            className="w-100 btn btn-primary btn-lg mt-3"
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
