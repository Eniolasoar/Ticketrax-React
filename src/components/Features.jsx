import React from "react";

const features = [
  {
    id: 1,
    icon: "🧾",
    title: "Full Ticket CRUD",
    desc: "Create, view, edit and delete tickets with real-time validation and clear feedback."
  },
  {
    id: 2,
    icon: "🔐",
    title: "Simulated Authentication",
    desc: "Protected routes using session tokens stored as `ticketapp_session` in localStorage."
  },
  {
    id: 3,
    icon: "📊",
    title: "Dashboard Overview",
    desc: "High-level statistics including total, open, and resolved tickets."
  },
  {
    id: 4,
    icon: "⚙️",
    title: "Validation & Error Handling",
    desc: "Client-side enforcement for title/status and consistent error messages."
  },
  {
    id: 5,
    icon: "♿",
    title: "Accessibility",
    desc: "Semantic markup, visible focus states, and sufficient color contrast."
  },
  {
    id: 6,
    icon: "📱",
    title: "Responsive Layout",
    desc: "Mobile-first with collapsible navigation and adaptive grid on larger screens."
  }
];

export default function Features() {
  return (
    <section id="features" className="features">
      <h2 className="section-title">What Features Does Ticketrax Offer</h2>
      <div className="features-grid" role="list">
        {features.map(f => (
          <article key={f.id} className="feature-card" role="listitem">
            <div className="feature-icon" aria-hidden="true">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
