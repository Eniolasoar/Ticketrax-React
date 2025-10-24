import React, { useState } from "react";
import { loginUser } from "../../utils/auth";
import Toast from "../Toast";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState({});
  const [toast, setToast] = useState(null);

  function validate() {
    const errs = {};
    if (!form.identifier.trim())
      errs.identifier = "Username or email is required.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setError(errs);

    if (Object.keys(errs).length === 0) {
      try {
        loginUser(form);
        setToast({ message: "Welcome back!", type: "success" });
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } catch (err) {
        setToast({ message: err.message, type: "error" });
      }
    }
  };

  return (
    <main className="auth-page">
      <h2>Login To Your Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Username or Email
          <input
            type="text"
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            aria-describedby={error.identifier ? "identifier-error" : undefined}
          />
          {error.identifier && (
            <span id="identifier-error" className="error">
              {error.identifier}
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

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="auth-switch">
    Don't have an account?{" "}
    <a href="/auth/signup" className="link">
      Signup
    </a>
  </p>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </main>
  );
}
