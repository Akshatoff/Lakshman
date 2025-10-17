"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Password reset email sent! Check your inbox.");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="mt-3 text-center text-muted">{message}</p>}
    </div>
  );
}
