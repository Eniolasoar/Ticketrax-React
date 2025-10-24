import React, { useState } from "react";
import { signupUser } from "../../utils/auth";
import Toast from "../Toast";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState({});
  const [toast, setToast] = useState(null);

  function validate() {
    const errs = {};
    if (!form.username.trim()) errs.username = "Username is required.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Please enter a valid email.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm)
      errs.confirm = "Passwords do not match.";
    return errs;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setError(errs);

    if (Object.keys(errs).length === 0) {
      try {
        signupUser(form);
        setToast({ message: "Account created successfully!", type: "success" });
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } catch (err) {
        setToast({ message: err.message, type: "error" });
      }
    }
  };

  return (
    <main className="auth-page">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            aria-describedby={error.username ? "username-error" : undefined}
          />
          {error.username && (
            <span id="username-error" className="error">
              {error.username}
            </span>
          )}
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-describedby={error.email ? "email-error" : undefined}
          />
          {error.email && (
            <span id="email-error" className="error">
              {error.email}
            </span>
          )}
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            aria-describedby={error.password ? "password-error" : undefined}
          />
          {error.password && (
            <span id="password-error" className="error">
              {error.password}
            </span>
          )}
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            aria-describedby={error.confirm ? "confirm-error" : undefined}
          />
          {error.confirm && (
            <span id="confirm-error" className="error">
              {error.confirm}
            </span>
          )}
        </label>

        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
      <p className="auth-switch">
    Already have an account?{" "}
    <a href="/auth/login" className="link">
      Login
    </a>
  </p>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </main>
  );
}
