import React from "react";

export default function Footer() {
  return (
    <footer
      className="site-footer relative"
      role="contentinfo"
      aria-label="Ticketrax website footer"
    >
      <div className="container footer-inner">
        {/* ===== Brand Section ===== */}
        <div className="footer-brand" role="group" aria-label="Ticketrax brand">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="12" r="10" fill="#0b6eff"></circle>
            <path
              d="M7 12h10"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 7v10"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <p className="brand-name">Ticketrax</p>
            <p className="brand-sub">Track it. Fix it. Move forward.</p>
          </div>
        </div>

        {/* ===== Links Section ===== */}
        <nav
          className="footer-links"
          aria-label="Footer links"
        >
          <a
            href="https://github.com/your-repo/ticketrax"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View Ticketrax project on GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#111"
                d="M12 .5C5.7.5.8 5.4.8 11.7c0 4.9 3.2 9 7.6 10.4.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.4-3.8-1.4-.5-1.2-1.3-1.6-1.3-1.6-1-.6.1-.6.1-.6 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7.9 2.4 1.3.2-1 .4-1.5.8-1.9-2.5-.3-5.2-1.3-5.2-6 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.3 1.2.9-.2 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.6.1 2.9.8.9 1.2 1.9 1.2 3.2 0 4.7-2.7 5.7-5.2 6 .5.4.9 1.1.9 2.2v3.2c0 .3.2.7.8.6 4.4-1.4 7.6-5.5 7.6-10.4C23.2 5.4 18.3.5 12 .5z"
              />
            </svg>
            <span className="github-text">View on GitHub</span>
          </a>
        </nav>

        {/* ===== Legal Section ===== */}
        <address className="copyright" aria-label="Copyright notice">
          © {new Date().getFullYear()} Ticketrax. All rights reserved.
        </address>
      </div>
    </footer>
  );
}
