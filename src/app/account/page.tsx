"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OrdersTab } from "@/components/account/OrdersTab/page";
import { AddressManagement } from "@/components/account/AddressManagement/page";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

function AccountPageContent() {
  const { user, signOut, loading: authLoading, updateProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check for tab parameter in URL
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long",
      });
      setLoading(false);
      return;
    }

    try {
      // Redirect to password reset page
      router.push("/auth/forgot-password");
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" });
      console.error("Password change error:", error);
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url);
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
                  onClick={() => handleTabChange("profile")}
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
                  onClick={() => handleTabChange("orders")}
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
                  onClick={() => handleTabChange("addresses")}
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
                  className={`list-group-item list-group-item-action ${activeTab === "wishlist" ? "active" : ""}`}
                  onClick={() => handleTabChange("wishlist")}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z" />
                  </svg>
                  My Wishlist
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => handleTabChange("security")}
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
            {activeTab === "orders" && <OrdersTab />}

            {/* Addresses Tab */}
            {activeTab === "addresses" && <AddressManagement />}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">My Wishlist</h4>
                  <div className="text-center py-5">
                    <svg
                      width="100"
                      height="100"
                      className="text-muted mb-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z" />
                    </svg>
                    <h5 className="text-muted">Your wishlist is empty</h5>
                    <p className="text-muted">
                      Add products to your wishlist to save them for later
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push("/")}
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">Security Settings</h4>

                  <div className="mb-4">
                    <h5 className="h6 mb-3">Change Password</h5>
                    <p className="text-muted mb-3">
                      To change your password, we'll send you a password reset
                      link to your email address.
                    </p>
                    <button
                      onClick={() => router.push("/auth/forgot-password")}
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      Send Password Reset Link
                    </button>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <h5 className="h6 mb-3">Two-Factor Authentication</h5>
                    <p className="text-muted mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <button className="btn btn-outline-primary" disabled>
                      Enable 2FA (Coming Soon)
                    </button>
                  </div>

                  <hr />

                  <div>
                    <h5 className="h6 mb-3 text-danger">Danger Zone</h5>
                    <p className="text-muted mb-3">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete your account? This action cannot be undone.",
                          )
                        ) {
                          alert("Account deletion feature coming soon");
                        }
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
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

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}
