import React from "react";

export default function Hero() {
  return (
    <section className="hero" role="region" aria-labelledby="hero-title">
      {/* Decorative Background Elements */}
      <div className="hero-decor" aria-hidden="true">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="blob"></div>
      </div>

      {/* Hero Content */}
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            Track it. Fix it. <span className="accent">Move forward</span> with{" "}
            <span className="brand">Ticketrax</span>
          </h1>
          <p className="hero-sub">
            Ticketrax helps teams capture issues, prioritize work, and ship fixes
            faster — all from a simple, delightful interface.
          </p>

          <div className="hero-actions" role="group" aria-label="Hero actions">
            <a href="/auth/signup" className="btn btn-primary2">Get Started</a>
            <a href="/auth/login" className="btn btn-ghost">Login</a>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="wave" aria-hidden="true"></div>
    </section>
  );
}
