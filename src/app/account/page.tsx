"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export default function AccountPage() {
  const { user, signOut, loading: authLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login?redirectTo=/account");
    }

    if (user) {
      setProfile({
        name: user.user_metadata?.name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
      });
    }
  }, [user, authLoading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await updateProfile({
        name: profile.name,
        phone: profile.phone,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Force a hard redirect to prevent auto-login
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px", fontSize: "32px" }}
                  >
                    {profile.name.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
                <h5 className="mb-1">{profile.name}</h5>
                <p className="text-muted small">{profile.email}</p>
              </div>
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                  My Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                  </svg>
                  My Orders
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "addresses" ? "active" : ""}`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  My Addresses
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                  </svg>
                  Security
                </button>
                <button
                  className="list-group-item list-group-item-action text-danger"
                  onClick={handleLogout}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {message.text && (
              <div
                className={`alert alert-${message.type === "success" ? "success" : "danger"} alert-dismissible fade show`}
                role="alert"
              >
                {message.text}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage({ type: "", text: "" })}
                ></button>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">Profile Information</h4>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profile.email}
                          disabled
                        />
                        <small className="text-muted">
                          Email cannot be changed
                        </small>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                          placeholder="+91 1234567890"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">My Orders</h4>
                  <div className="text-center py-5">
                    <svg
                      width="100"
                      height="100"
                      className="text-muted mb-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                    <h5 className="text-muted">No orders yet</h5>
                    <p className="text-muted">
                      Start shopping to see your orders here
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push("/")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">My Addresses</h4>
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
                    <p className="text-muted">
                      Add an address for faster checkout
                    </p>
                    <button className="btn btn-primary">Add New Address</button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">Change Password</h4>

                  <button
                    onClick={() => router.push("/auth/forgot-password")}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
