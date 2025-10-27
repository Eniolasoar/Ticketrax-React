import React from "react";

export default function Banner() {
  return (
    <section className="banner" role="region" aria-labelledby="banner-heading">
      <div className="container banner-inner">
        <h3 id="banner-heading">Ready to transform your support?</h3>
        <p className="muted">
          Start tracking issues, streamline fixes, and keep your users happy.
        </p>
        <a
          className="btn btn-primary2"
          href="/auth/signup"
          role="button"
          aria-label="Get started with Ticketrax"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
