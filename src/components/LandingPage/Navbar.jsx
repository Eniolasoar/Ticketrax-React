import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="container nav-inner">
        {/* Logo with accessible label */}
        <a href="/" className="logo" aria-label="Go to Ticketrax homepage">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Ticketrax logo"
          >
            <circle cx="12" cy="12" r="10" fill="#0b6eff"></circle>
            <path d="M7 12h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 7v10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="logo-text" aria-hidden="true">Ticketrax</span>
        </a>

        {/* Hamburger Toggle */}
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="hamburger" aria-hidden="true" />
        </button>

        {/* Navigation */}
        <nav
          id="primary-navigation"
          className={`nav ${open ? "open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul role="menubar" className="nav-list">
            <li role="none">
              <a className="nav-link" href="#features" role="menuitem" tabIndex="0">Features</a>
            </li>
            <li role="none">
              <a className="nav-link" href="/auth/login" role="menuitem" tabIndex="0">Login</a>
            </li>
            <li role="none">
              <a className="btn btn-primary2 nav-cta" href="/auth/signup" role="menuitem" tabIndex="0">
                Sign up
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
