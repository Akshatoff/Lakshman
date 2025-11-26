// src/contexts/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
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

  // ⭐ OPTIMIZATION: Debounce and request deduplication
  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const refreshCart = useCallback(async () => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    // ⭐ Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // ⭐ Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/cart", {
        signal: abortControllerRef.current.signal,
        // ⭐ Add cache headers for better performance
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to fetch cart");
        setItems([]);
      }
    } catch (error: any) {
      // Don't log aborted requests
      if (error.name !== "AbortError") {
        console.error("Error fetching cart:", error);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // ⭐ Debounced refresh to prevent excessive API calls
  const debouncedRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      refreshCart();
    }, 300);
  }, [refreshCart]);

  useEffect(() => {
    if (user?.id) {
      refreshCart();
    } else {
      setItems([]);
      setLoading(false);
    }

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [user?.id, refreshCart]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!user) {
      alert("Please log in to add items to cart");
      return;
    }

    // ⭐ OPTIMISTIC UPDATE: Update UI immediately
    const tempId = Date.now();
    const optimisticItem: CartItem = {
      id: tempId,
      cartId: 0,
      productId,
      quantity,
      product: {
        id: productId,
        title: "Loading...",
        name: null,
        priceCents: 0,
        image: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItems((prev) => [...prev, optimisticItem]);

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        // ⭐ Use debounced refresh instead of immediate refresh
        debouncedRefresh();
      } else {
        // ⭐ Rollback optimistic update on error
        setItems((prev) => prev.filter((item) => item.id !== tempId));
        const error = await response.json();
        alert(error.error || "Failed to add item to cart");
      }
    } catch (error) {
      // ⭐ Rollback on network error
      setItems((prev) => prev.filter((item) => item.id !== tempId));
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) return;

    // ⭐ OPTIMISTIC UPDATE
    const prevItems = [...items];
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );

    try {
      const response = await fetch("/api/cart/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        // ⭐ Rollback on error
        setItems(prevItems);
        const error = await response.json();
        alert(error.error || "Failed to update quantity");
      }
    } catch (error) {
      // ⭐ Rollback on network error
      setItems(prevItems);
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return;

    // ⭐ OPTIMISTIC UPDATE
    const prevItems = [...items];
    setItems((prev) => prev.filter((item) => item.productId !== productId));

    try {
      const response = await fetch(`/api/cart/items/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // ⭐ Rollback on error
        setItems(prevItems);
        console.error("Failed to remove item");
      }
    } catch (error) {
      // ⭐ Rollback on network error
      setItems(prevItems);
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    // ⭐ OPTIMISTIC UPDATE
    const prevItems = [...items];
    setItems([]);

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      if (!response.ok) {
        // ⭐ Rollback on error
        setItems(prevItems);
      }
    } catch (error) {
      // ⭐ Rollback on network error
      setItems(prevItems);
      console.error("Error clearing cart:", error);
    }
  };

  // ⭐ OPTIMIZATION: Memoize computed values
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
