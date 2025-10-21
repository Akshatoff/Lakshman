"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search products as user types
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery)}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.data.products.slice(0, 8)); // Limit to 8 results
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      // Close offcanvas and navigate
      const offcanvas = document.getElementById("offcanvasSearch");
      if (offcanvas) {
        const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(
          offcanvas
        );
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }

      // Navigate to products page with search query
      window.location.href = `/#products`;
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex={-1}
      id="offcanvasSearch"
      aria-labelledby="Search"
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
            <span className="text-primary">Search Products</span>
          </h4>

          <form
            role="search"
            onSubmit={handleSearch}
            className="d-flex mt-3 gap-0"
          >
            <input
              className="form-control rounded-start rounded-0 bg-light"
              type="text"
              placeholder="Search for products..."
              aria-label="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button
              className="btn btn-dark rounded-end rounded-0"
              type="submit"
              disabled={isSearching}
            >
              {isSearching ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Search"
              )}
            </button>
          </form>

          {/* Search Results */}
          {searchQuery.trim().length >= 2 && (
            <div className="mt-4">
              <h6 className="text-muted mb-3">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`
                  : isSearching
                  ? "Searching..."
                  : "No results found"}
              </h6>

              <div className="list-group">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="list-group-item list-group-item-action"
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={product.image || "/images/placeholder.png"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{product.name}</h6>
                        <small className="text-muted text-capitalize">
                          {product.category}
                        </small>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {searchQuery.trim().length < 2 && (
            <>
              <div className="mt-4">
                <h6 className="text-muted">Popular Searches</h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuickSearch("shirt")}
                  >
                    Shirt
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuickSearch("shoes")}
                  >
                    Shoes
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuickSearch("hoodie")}
                  >
                    Hoodie
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuickSearch("pants")}
                  >
                    Pants
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleQuickSearch("t-shirt")}
                  >
                    T-Shirt
                  </button>
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="text-muted mb-0">Recent Searches</h6>
                    <button
                      className="btn btn-link btn-sm text-danger p-0"
                      onClick={clearRecentSearches}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="list-group list-group-flush">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="list-group-item list-group-item-action border-0 px-0"
                        onClick={() => handleQuickSearch(search)}
                      >
                        <svg
                          width="16"
                          height="16"
                          className="me-2"
                          fill="currentColor"
                        >
                          <use xlinkHref="#search"></use>
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
