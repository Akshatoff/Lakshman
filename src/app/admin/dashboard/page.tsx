"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  quantity: string;
  category: string;
  isNew: boolean;
  isBestseller: boolean;
}

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "4.0",
    quantity: "",
    category: "",
    image: "",
    isNew: false,
    isBestseller: false,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    image: "",
    link: "index.html",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();

      if (result.success) {
        setProducts(result.data.products);
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct
        ? { ...productForm, id: editingProduct.id }
        : productForm;

      const response = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        loadData();
        resetProductForm();
        setShowProductModal(false);
        alert(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        loadData();
        alert("Product deleted successfully!");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      discount: product.discount?.toString() || "",
      rating: product.rating.toString(),
      quantity: product.quantity,
      category: product.category,
      image: product.image,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
    });
    setShowProductModal(true);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      discount: "",
      rating: "4.0",
      quantity: "",
      category: "",
      image: "",
      isNew: false,
      isBestseller: false,
    });
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify({ products: { all: products }, categories }, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "products_data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Admin Dashboard
                  </li>
                </ol>
              </nav>
            </div>
            <button
              className="btn btn-success"
              onClick={downloadJSON}
            >
              Download JSON
            </button>
          </div>

          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "products" ? "active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                Products ({products.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "categories" ? "active" : ""}`}
                onClick={() => setActiveTab("categories")}
              >
                Categories ({categories.length})
              </button>
            </li>
          </ul>

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Products Management</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    resetProductForm();
                    setShowProductModal(true);
                  }}
                >
                  Add New Product
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            className="rounded"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>₹{product.price.toLocaleString()}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {product.category}
                          </span>
                        </td>
                        <td>{product.rating} ⭐</td>
                        <td>
                          {product.isNew && <span className="badge bg-success me-1">New</span>}
                          {product.isBestseller && <span className="badge bg-warning">Bestseller</span>}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => editProduct(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Categories Management</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCategoryModal(true)}
                >
                  Add New Category
                </button>
              </div>

              <div className="row">
                {categories.map((category) => (
                  <div key={category.id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card">
                      <img
                        src={category.image}
                        className="card-img-top"
                        alt={category.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>
              <form onSubmit={handleProductSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price (₹)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Original Price (₹)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                          className="form-control"
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="sofas">Sofas & Seating</option>
                          <option value="beds">Beds</option>
                          <option value="dining">Dining Tables & Chairs</option>
                          <option value="wardrobes">Wardrobes</option>
                          <option value="office">Office Furniture</option>
                          <option value="decor">Home Decor</option>
                          <option value="outdoor">Outdoor Furniture</option>
                          <option value="revolving-chair">Revolving Chair</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Discount (%)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={productForm.discount}
                          onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          className="form-control"
                          value={productForm.rating}
                          onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input
                          type="text"
                          className="form-control"
                          value={productForm.quantity}
                          onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={productForm.isNew}
                          onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                        />
                        <label className="form-check-label">Mark as New</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={productForm.isBestseller}
                          onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                        />
                        <label className="form-check-label">Mark as Bestseller</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowProductModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
