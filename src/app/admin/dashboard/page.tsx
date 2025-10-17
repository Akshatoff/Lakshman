"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "4.0",
    quantity: "1 Unit",
    category: "",
    image: "",
    description: "",
    isNew: false,
    isBestseller: false,
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
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return productForm.image || null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ml_default"); // You'll need to create this in Cloudinary
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image to Cloudinary");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary if a new image was selected
      let imageUrl = productForm.image;
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if image upload failed
        }
      }

      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct
        ? { ...productForm, image: imageUrl, id: editingProduct.id }
        : { ...productForm, image: imageUrl };

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
        alert(
          editingProduct
            ? "Product updated successfully!"
            : "Product added successfully!",
        );
      } else {
        alert(result.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
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
        alert(result.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleUpdateDatabase = async () => {
    if (
      !confirm(
        "Are you sure you want to update the database with current data?",
      )
    )
      return;

    try {
      setLoading(true);
      // This will refresh the data from the database
      await loadData();
      alert("Database updated successfully!");
    } catch (error) {
      console.error("Error updating database:", error);
      alert("Failed to update database");
    } finally {
      setLoading(false);
    }
  };

  const openEditProduct = (product: Product) => {
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
      description: "",
      isNew: product.isNew,
      isBestseller: product.isBestseller,
    });
    setImagePreview(product.image);
    setShowProductModal(true);
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      discount: "",
      rating: "4.0",
      quantity: "1 Unit",
      category: "",
      image: "",
      description: "",
      isNew: false,
      isBestseller: false,
    });
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleProductFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Admin Dashboard</h1>
              <p className="text-muted mb-0">Manage your furniture store</p>
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-success"
                onClick={handleUpdateDatabase}
                disabled={loading}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6 0 .79-.15 1.56-.44 2.25-.15.36-.04.77.23 1.04.51.51 1.37.33 1.64-.34.37-.91.57-1.91.57-2.95 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.79.15-1.56.44-2.25.15-.36.04-.77-.23-1.04-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V18z" />
                </svg>
                Update Database
              </button>
              <Link href="/" className="btn btn-outline-primary">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Navigation</h5>
                <div className="list-group">
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === "products" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("products")}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="me-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
                    </svg>
                    Products ({products.length})
                  </button>
                  <button
                    className={`list-group-item list-group-item-action ${
                      activeTab === "categories" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("categories")}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="me-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                    </svg>
                    Categories ({categories.length})
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-4">
                  <h6 className="text-muted mb-3">Quick Stats</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Products:</span>
                    <strong>{products.length}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>New Arrivals:</span>
                    <strong>{products.filter((p) => p.isNew).length}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Bestsellers:</span>
                    <strong>
                      {products.filter((p) => p.isBestseller).length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-9">
            {activeTab === "products" && (
              <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Products Management</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      resetProductForm();
                      setShowProductModal(true);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="me-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z" />
                    </svg>
                    Add Product
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Rating</th>
                          <th>Tags</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={50}
                                height={50}
                                className="rounded"
                                unoptimized={product.image.startsWith("http")}
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>
                              <div>
                                <strong>
                                  ₹{product.price.toLocaleString()}
                                </strong>
                                {product.originalPrice && (
                                  <small className="text-muted ms-2">
                                    <del>
                                      ₹{product.originalPrice.toLocaleString()}
                                    </del>
                                  </small>
                                )}
                                {product.discount && (
                                  <span className="badge bg-success ms-2">
                                    -{product.discount}%
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-secondary">
                                {product.category}
                              </span>
                            </td>
                            <td>
                              <span className="text-warning">★</span>{" "}
                              {product.rating}
                            </td>
                            <td>
                              {product.isNew && (
                                <span className="badge bg-info me-1">New</span>
                              )}
                              {product.isBestseller && (
                                <span className="badge bg-warning">
                                  Bestseller
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => openEditProduct(product)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div className="card">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Categories Management</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {categories.map((category) => (
                      <div key={category.id} className="col-md-4 mb-3">
                        <div className="card">
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={300}
                            height={200}
                            className="card-img-top"
                            unoptimized={category.image.startsWith("http")}
                          />
                          <div className="card-body">
                            <h6 className="card-title">{category.name}</h6>
                            <p className="text-muted small">
                              ID: {category.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content overflow-y-scroll">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowProductModal(false);
                    resetProductForm();
                  }}
                ></button>
              </div>
              <form onSubmit={handleProductSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-select"
                        name="category"
                        value={productForm.category}
                        onChange={handleProductFormChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Price (₹) *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        step="0.01"
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Original Price (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="originalPrice"
                        value={productForm.originalPrice}
                        onChange={handleProductFormChange}
                        step="0.01"
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Discount (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="discount"
                        value={productForm.discount}
                        onChange={handleProductFormChange}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Rating</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        value={productForm.rating}
                        onChange={handleProductFormChange}
                        step="0.1"
                        min="0"
                        max="5"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        value={productForm.quantity}
                        onChange={handleProductFormChange}
                        placeholder="e.g., 1 Unit"
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={productForm.description}
                        onChange={handleProductFormChange}
                        rows={3}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Product Image *</label>
                      <input
                        type="file"
                        className="form-control mb-2"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="rounded"
                            unoptimized={
                              imagePreview.startsWith("http") ||
                              imagePreview.startsWith("data:")
                            }
                          />
                        </div>
                      )}
                      {!imageFile && !editingProduct && (
                        <input
                          type="url"
                          className="form-control mt-2"
                          name="image"
                          value={productForm.image}
                          onChange={handleProductFormChange}
                          placeholder="Or enter image URL"
                          required={!imageFile}
                        />
                      )}
                    </div>

                    <div className="col-12">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isNew"
                          id="isNew"
                          checked={productForm.isNew}
                          onChange={handleProductFormChange}
                        />
                        <label className="form-check-label" htmlFor="isNew">
                          New Arrival
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isBestseller"
                          id="isBestseller"
                          checked={productForm.isBestseller}
                          onChange={handleProductFormChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isBestseller"
                        >
                          Bestseller
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowProductModal(false);
                      resetProductForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Uploading...
                      </>
                    ) : editingProduct ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
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
