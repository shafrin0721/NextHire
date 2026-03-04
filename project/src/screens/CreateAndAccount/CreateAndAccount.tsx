import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateAndAccount.css";

/* ========== TYPES ========== */

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/* ========== ICONS ========== */

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ========== COMPONENT ========== */

export const CreateAndAccount = (): JSX.Element => {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous API messages
    setApiMessage("");
    setApiSuccess(false);

    // Validate form
    if (!validate()) return;

    // Start loading
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost/NextHire/api/signup.php",
        {
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Debug log
      console.log("API Response:", response.data);

      if (response.data.success || response.data.status === "success") {
        setApiSuccess(true);
        setApiMessage(
          response.data.message || "Account created successfully! Redirecting to login..."
        );

        // Clear form
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setApiSuccess(false);
        setApiMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response) {
        // Server responded with an error
        console.log("Error response data:", error.response.data);
        setApiMessage(
          error.response.data?.message || "Server error. Please try again later."
        );
      } else if (error.request) {
        // No response received
        setApiMessage("Cannot connect to server. Please check your connection.");
      } else {
        setApiMessage("An unexpected error occurred. Please try again.");
      }
      setApiSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* ===== NAVBAR ===== */}
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/nexthire-logo.png" alt="NextHire Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">NextHire</span>
          </Link>

          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="navbar-auth">
            <Link to="/login" className="btn-nav-login">Login</Link>
            <Link to="/signup" className="btn-nav-register">Register</Link>
          </div>
        </div>
      </header>

      {/* ===== MAIN FORM ===== */}
      <main className="signup-main">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>
              Already have an account?{" "}
              <Link to="/login">Log in</Link>
            </p>
          </div>

          {/* API Response Messages */}
          {apiMessage && (
            <div className={`message-banner ${apiSuccess ? "message-success" : "message-error"}`}>
              {apiSuccess ? <CheckCircleIcon /> : <AlertCircleIcon />}
              <span>{apiMessage}</span>
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="form-input-wrapper">
                <input
                  id="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? "input-error" : ""}`}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                />
              </div>
              {errors.fullName && (
                <span className="error-text">
                  <AlertCircleIcon />
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="form-input-wrapper">
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
              </div>
              {errors.email && (
                <span className="error-text">
                  <AlertCircleIcon />
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="form-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input has-toggle ${errors.password ? "input-error" : ""}`}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password ? (
                <span className="error-text">
                  <AlertCircleIcon />
                  {errors.password}
                </span>
              ) : (
                <span className="password-hint">Must be at least 6 characters</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="form-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-input has-toggle ${errors.confirmPassword ? "input-error" : ""}`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-text">
                  <AlertCircleIcon />
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Terms */}
            <p className="terms-text">
              By creating an account, you agree to the{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </p>

            {/* Submit Button */}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="signup-divider">
            <div className="signup-divider-line"></div>
            <span className="signup-divider-text">Or continue with</span>
            <div className="signup-divider-line"></div>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <button type="button" className="btn-social">
              <GoogleIcon />
              Google
            </button>
            <button type="button" className="btn-social">
              <FacebookIcon />
              Facebook
            </button>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2024 NextHire. All rights reserved.</p>
      </footer>
    </div>
  );
};
