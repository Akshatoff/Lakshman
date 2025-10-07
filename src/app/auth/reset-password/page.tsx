"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Password updated! You can now log in.");
      setTimeout(() => (window.location.href = "/auth/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>

      {message && <p className="mt-3 text-center text-muted">{message}</p>}
    </div>
  );
}
