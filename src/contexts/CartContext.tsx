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

interface GuestCartItem {
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    name: string | null;
    priceCents: number;
    image: string | null;
  };
}

// Callers pass this so we never need an extra API fetch for guest carts
export interface ProductMeta {
  id: number;
  title: string;
  name?: string | null;
  priceCents: number;
  image?: string | null;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  totalCents: number;
  addToCart: (productId: number, quantity?: number, productMeta?: ProductMeta) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isGuest: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "lakshman_guest_cart";

function loadGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGuestCart(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function clearGuestCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_CART_KEY);
}

function guestItemsToCartItems(guestItems: GuestCartItem[]): CartItem[] {
  return guestItems.map((g, idx) => ({
    id: -(idx + 1),
    cartId: 0,
    productId: g.productId,
    quantity: g.quantity,
    product: g.product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { user } = useAuth();

  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevUserIdRef = useRef<string | null>(null);

  const refreshServerCart = useCallback(async () => {
    if (!user?.id) return;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/cart", {
        signal: abortControllerRef.current.signal,
        headers: { "Cache-Control": "no-cache" },
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        setItems([]);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching cart:", error);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const debouncedRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = setTimeout(() => refreshServerCart(), 300);
  }, [refreshServerCart]);

  const mergeGuestCartToServer = useCallback(async () => {
    const guestItems = loadGuestCart();
    if (guestItems.length === 0) return;
    for (const item of guestItems) {
      try {
        await fetch("/api/cart/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
        });
      } catch (err) {
        console.error("Error merging guest cart item:", err);
      }
    }
    clearGuestCart();
  }, []);

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    const prevUserId = prevUserIdRef.current;

    if (currentUserId) {
      if (prevUserId !== currentUserId) {
        setIsGuest(false);
        setLoading(true);
        mergeGuestCartToServer().then(() => refreshServerCart());
      }
    } else {
      setIsGuest(true);
      const guestItems = loadGuestCart();
      setItems(guestItemsToCartItems(guestItems));
      setLoading(false);
    }

    prevUserIdRef.current = currentUserId;

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, [user?.id, mergeGuestCartToServer, refreshServerCart]);

  const refreshCart = useCallback(async () => {
    if (user?.id) {
      await refreshServerCart();
    } else {
      const guestItems = loadGuestCart();
      setItems(guestItemsToCartItems(guestItems));
    }
  }, [user?.id, refreshServerCart]);

  // ─────────────────────────────────────────────────────────
  // addToCart — accepts optional productMeta so callers that
  // already have the product object don't trigger an extra fetch
  // ─────────────────────────────────────────────────────────
  const addToCart = async (
    productId: number,
    quantity: number = 1,
    productMeta?: ProductMeta,
  ) => {
    if (!user) {
      // GUEST: save to localStorage
      const guestItems = loadGuestCart();
      const existingIdx = guestItems.findIndex((i) => i.productId === productId);

      if (existingIdx !== -1) {
        guestItems[existingIdx].quantity += quantity;
      } else {
        // Use supplied meta first — no fetch needed when caller provides it
        let meta: ProductMeta | null = productMeta ?? null;

        if (!meta) {
          // Fallback: try fetching from the single-product endpoint
          try {
            const res = await fetch(`/api/products/${productId}`);
            if (res.ok) {
              const data = await res.json();
              if (data.success && data.data) {
                meta = {
                  id: data.data.id,
                  title: data.data.title,
                  name: data.data.name ?? null,
                  priceCents: data.data.priceCents,
                  image: data.data.image ?? null,
                };
              }
            }
          } catch {
            // silently fall through to placeholder
          }
        }

        guestItems.push({
          productId,
          quantity,
          product: {
            id: productId,
            title: meta?.title ?? "Product",
            name: meta?.name ?? null,
            priceCents: meta?.priceCents ?? 0,
            image: meta?.image ?? null,
          },
        });
      }

      saveGuestCart(guestItems);
      setItems(guestItemsToCartItems(guestItems));
      return;
    }

    // LOGGED-IN: optimistic update then server POST
    const tempId = Date.now();
    const optimisticItem: CartItem = {
      id: tempId,
      cartId: 0,
      productId,
      quantity,
      product: {
        id: productId,
        title: productMeta?.title ?? "Loading...",
        name: productMeta?.name ?? null,
        priceCents: productMeta?.priceCents ?? 0,
        image: productMeta?.image ?? null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, optimisticItem]);

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (response.ok) {
        debouncedRefresh();
      } else {
        setItems((prev) => prev.filter((item) => item.id !== tempId));
        const error = await response.json();
        alert(error.error || "Failed to add item to cart");
      }
    } catch (error) {
      setItems((prev) => prev.filter((item) => item.id !== tempId));
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) {
      const guestItems = loadGuestCart();
      const idx = guestItems.findIndex((i) => i.productId === productId);
      if (idx !== -1) {
        guestItems[idx].quantity = quantity;
        saveGuestCart(guestItems);
        setItems(guestItemsToCartItems(guestItems));
      }
      return;
    }

    const prevItems = [...items];
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );

    try {
      const response = await fetch("/api/cart/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        setItems(prevItems);
        const error = await response.json();
        alert(error.error || "Failed to update quantity");
      }
    } catch (error) {
      setItems(prevItems);
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) {
      const guestItems = loadGuestCart().filter((i) => i.productId !== productId);
      saveGuestCart(guestItems);
      setItems(guestItemsToCartItems(guestItems));
      return;
    }

    const prevItems = [...items];
    setItems((prev) => prev.filter((item) => item.productId !== productId));

    try {
      const response = await fetch(`/api/cart/items/${productId}`, { method: "DELETE" });
      if (!response.ok) setItems(prevItems);
    } catch (error) {
      setItems(prevItems);
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!user) {
      clearGuestCart();
      setItems([]);
      return;
    }

    const prevItems = [...items];
    setItems([]);

    try {
      const response = await fetch("/api/cart", { method: "DELETE" });
      if (!response.ok) setItems(prevItems);
    } catch (error) {
      setItems(prevItems);
      console.error("Error clearing cart:", error);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        itemCount,
        totalCents,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        isGuest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
