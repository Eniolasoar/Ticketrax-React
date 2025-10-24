import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      {/* Decorative Shapes */}
      <div className="hero-decor">
        <div className="circle circle-1" aria-hidden="true"></div>
        <div className="circle circle-2" aria-hidden="true"></div>
        <div className="blob" aria-hidden="true"></div>
      </div>

      {/* Hero Content */}
      <div className="container hero-inner">
        <div className="hero-content" role="region" aria-label="Hero">
          <h1 className="hero-title">
            Track it. Fix it. <span className="accent">Move forward</span> with{" "}
            <span className="brand">Ticketrax</span>
          </h1>
          <p className="hero-sub">
            Ticketrax helps teams capture issues, prioritize work, and ship fixes
            faster — all from a simple, delightful interface.
          </p>

          <div className="hero-actions">
            <a href="/auth/signup" className="btn btn-primary2">
              Get Started
            </a>
            <a href="/auth/login" className="btn btn-ghost">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Blue Wave */}
      <div className="wave"></div>
    </section>
  );
}
