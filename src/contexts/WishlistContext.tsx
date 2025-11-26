// src/contexts/WishlistContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

interface Product {
  id: number;
  title: string;
  name: string | null;
  priceCents: number;
  originalPriceCents: number | null;
  discount: number | null;
  image: string | null;
  category: string;
  rating: number;
  inventory: number;
}

interface WishlistItem {
  id: number;
  productId: number;
  product: Product;
  createdAt: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  loading: boolean;
  itemCount: number;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  moveToCart: (productId: number) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to fetch wishlist");
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      refreshWishlist();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user, refreshWishlist]);

  const isInWishlist = (productId: number): boolean => {
    return items.some((item) => item.productId === productId);
  };

  const addToWishlist = async (productId: number) => {
    if (!user) {
      alert("Please log in to add items to wishlist");
      return;
    }

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await refreshWishlist();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add item to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add item to wishlist");
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await refreshWishlist();
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const moveToCart = async (productId: number) => {
    if (!user) return;

    try {
      // Add to cart
      const cartResponse = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (cartResponse.ok) {
        // Remove from wishlist
        await removeFromWishlist(productId);
      } else {
        const error = await cartResponse.json();
        alert(error.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error moving to cart:", error);
      alert("Failed to move item to cart");
    }
  };

  const itemCount = items.length;

  const value = {
    items,
    loading,
    itemCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    refreshWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
