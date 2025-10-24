import React from "react";

export default function Banner() {
  return (
    <div className="banner">
      <div className="container banner-inner">
        <h3>Ready to transform your support?</h3>
        <p className="muted">Start tracking issues, streamline fixes, and keep your users happy.</p>
        <a className="btn btn-primary2" href="/auth/signup">Get Started</a>
      </div>
    </div>
  );
}
