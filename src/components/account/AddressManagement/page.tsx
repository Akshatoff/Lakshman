// src/components/account/AddressManagement.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Address {
  id: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: string;
}

export function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    isDefault: false,
    type: "HOME",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const response = await fetch("/api/addresses");
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingAddress ? "/api/addresses" : "/api/addresses";
      const method = editingAddress ? "PUT" : "POST";
      const body = editingAddress
        ? { ...formData, id: editingAddress.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await loadAddresses();
        resetForm();
        setShowForm(false);
        alert(
          editingAddress
            ? "Address updated successfully!"
            : "Address added successfully!",
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
      type: address.type,
    });
    setShowForm(true);
  };

  const handleDelete = async (addressId: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const response = await fetch(`/api/addresses?id=${addressId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadAddresses();
        alert("Address deleted successfully!");
      } else {
        alert("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      isDefault: false,
      type: "HOME",
    });
    setEditingAddress(null);
  };

  if (loading && addresses.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title mb-0">My Addresses</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "+ Add New Address"}
          </button>
        </div>

        {/* Address Form */}
        {showForm && (
          <div className="card mb-4 border-primary">
            <div className="card-body">
              <h5 className="mb-3">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address Line 1 *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.addressLine1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine1: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.addressLine2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address Type</label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="HOME">Home</option>
                      <option value="WORK">Work</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isDefault"
                        checked={formData.isDefault}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="isDefault">
                        Set as default address
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Address"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        resetForm();
                        setShowForm(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Address List */}
        {addresses.length === 0 ? (
          <div className="text-center py-5">
            <svg
              width="100"
              height="100"
              className="text-muted mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <h5 className="text-muted">No saved addresses</h5>
            <p className="text-muted">Add an address for faster checkout</p>
          </div>
        ) : (
          <div className="row g-3">
            {addresses.map((address) => (
              <div key={address.id} className="col-md-6">
                <div
                  className={`card h-100 ${address.isDefault ? "border-primary" : ""}`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-0">{address.fullName}</h6>
                        <span className="badge bg-secondary me-2">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="badge bg-primary">Default</span>
                        )}
                      </div>
                    </div>
                    <p className="mb-1 small">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="mb-1 small">{address.addressLine2}</p>
                    )}
                    <p className="mb-1 small">
                      {address.city}, {address.state} - {address.zipCode}
                    </p>
                    <p className="mb-2 small text-muted">
                      Phone: {address.phone}
                    </p>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(address.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
