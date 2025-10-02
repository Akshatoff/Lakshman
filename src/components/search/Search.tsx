"use client";

import React, { useState } from "react";

declare global {
  interface Window {
    bootstrap?: any;
  }
}
export {};

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Search query:", searchQuery);
    // Close offcanvas after search
    const offcanvas = document.getElementById("offcanvasSearch");
    if (offcanvas) {
      const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(
        offcanvas,
      );
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
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
            <span className="text-primary">Search</span>
          </h4>
          <form
            role="search"
            onSubmit={handleSearch}
            className="d-flex mt-3 gap-0"
          >
            <input
              className="form-control rounded-start rounded-0 bg-light"
              type="text"
              placeholder="What are you looking for?"
              aria-label="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-dark rounded-end rounded-0"
              type="submit"
            >
              Search
            </button>
          </form>

          {/* Search Suggestions */}
          <div className="mt-4">
            <h6 className="text-muted">Popular Searches</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSearchQuery("Sofa")}
              >
                Sofa
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSearchQuery("Bed")}
              >
                Bed
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSearchQuery("Dining Table")}
              >
                Dining Table
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSearchQuery("Office Chair")}
              >
                Office Chair
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSearchQuery("Wardrobe")}
              >
                Wardrobe
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mt-4">
            <h6 className="text-muted">Recent Searches</h6>
            <div className="list-group list-group-flush">
              <button className="list-group-item list-group-item-action border-0 px-0">
                <svg
                  width="16"
                  height="16"
                  className="me-2"
                  fill="currentColor"
                >
                  <use xlinkHref="#search"></use>
                </svg>
                L-shaped sofa
              </button>
              <button className="list-group-item list-group-item-action border-0 px-0">
                <svg
                  width="16"
                  height="16"
                  className="me-2"
                  fill="currentColor"
                >
                  <use xlinkHref="#search"></use>
                </svg>
                King size bed
              </button>
              <button className="list-group-item list-group-item-action border-0 px-0">
                <svg
                  width="16"
                  height="16"
                  className="me-2"
                  fill="currentColor"
                >
                  <use xlinkHref="#search"></use>
                </svg>
                Office desk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
