"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    name: string | null;
    priceCents: number;
    image: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  totalCents: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshCart = useCallback(async () => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to fetch cart");
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch cart on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      refreshCart();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user?.id, refreshCart]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!user) {
      alert("Please log in to add items to cart");
      return;
    }

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        await refreshCart();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) return;

    try {
      const response = await fetch("/api/cart/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        await refreshCart();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/cart/items/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await refreshCart();
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (response.ok) {
        setItems([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  const value = {
    items,
    loading,
    itemCount,
    totalCents,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
