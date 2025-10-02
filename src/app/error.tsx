"use client";

import React from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-danger"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              <h1 className="display-4 fw-bold text-dark mb-3">
                Oops! Something went wrong
              </h1>

              <p className="lead text-muted mb-4">
                We encountered an unexpected error while processing your
                request. Don&apos;t worry, our team has been notified and
                we&apos;re working to fix this.
              </p>

              {process.env.NODE_ENV === "development" && (
                <div className="alert alert-warning text-start mb-4">
                  <h6 className="alert-heading">
                    Error Details (Development):
                  </h6>
                  <pre className="small mb-0">
                    <code>{error.message}</code>
                  </pre>
                  {error.digest && (
                    <small className="text-muted d-block mt-2">
                      Error ID: {error.digest}
                    </small>
                  )}
                </div>
              )}

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button onClick={reset} className="btn btn-primary btn-lg px-4">
                  Try Again
                </button>

                <Link href="/" className="btn btn-outline-primary btn-lg px-4">
                  Go Home
                </Link>
              </div>

              <div className="mt-5 pt-4 border-top">
                <p className="text-muted small mb-3">
                  If this problem persists, please contact our support team:
                </p>
                <div className="d-flex justify-content-center gap-4">
                  <a
                    href="mailto:support@lakshman.com"
                    className="text-decoration-none text-primary"
                  >
                    <svg
                      width="16"
                      height="16"
                      className="me-1"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Email Support
                  </a>
                  <a
                    href="tel:+91-9525507352"
                    className="text-decoration-none text-primary"
                  >
                    <svg
                      width="16"
                      height="16"
                      className="me-1"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
