import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a href="/" className="logo" aria-label="Ticketrax home">
          <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="10" fill="#0b6eff"></circle>
            <path d="M7 12h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 7v10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="logo-text">Ticketrax</span>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="hamburger" />
        </button>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Primary">
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="/auth/login">Login</a>
          <a className="btn btn-primary nav-cta" href="/auth/signup">Sign up</a>
        </nav>
      </div>
    </header>
  );
}
