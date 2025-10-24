import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const TicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [error, setError] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Load tickets & session validation
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      navigate("/auth/login");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(stored);
  }, [navigate]);

  // ✅ Save tickets to localStorage
  const saveTickets = (data) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(data));
    setTickets(data);
  };

  // ✅ Form validation
  const validate = () => {
    const newError = {};
    if (!form.title.trim()) newError.title = "Title is required.";
    if (!["open", "in_progress", "closed"].includes(form.status))
      newError.status = "Invalid status.";
    if (form.description.length > 300)
      newError.description = "Description must be under 300 characters.";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // ✅ Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let updated;
    if (editingId) {
      updated = tickets.map((t) =>
        t.id === editingId ? { ...t, ...form } : t
      );
      setToast({ type: "success", message: "Ticket updated successfully." });
    } else {
      updated = [
        ...tickets,
        { id: Date.now(), ...form, createdAt: new Date().toISOString() },
      ];
      setToast({ type: "success", message: "Ticket created successfully." });
    }

    saveTickets(updated);
    setForm({ title: "", description: "", status: "open" });
    setEditingId(null);
  };

  // ✅ Edit Ticket
  const handleEdit = (ticket) => {
    setForm(ticket);
    setEditingId(ticket.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete Ticket
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    const filtered = tickets.filter((t) => t.id !== id);
    saveTickets(filtered);
    setToast({ type: "info", message: "Ticket deleted." });
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    setToast({ type: "success", message: "Logged out successfully." });
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* ====== Top Navbar (Mobile) ====== */}
      <header className="mobile-header">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <h1 className="mobile-title">Ticketrax</h1>
      </header>

      {/* ====== Sidebar ====== */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">Ticketrax</h2>
        <nav>
          <ul>
            <li><button onClick={() => navigate("/dashboard")}>Dashboard</button></li>
            <li><button onClick={() => navigate("/tickets")}>Ticket Management</button></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </aside>

      {/* ====== Main Content ====== */}
      <main className="dashboard-main">
        <div className="content-header">
          <h2>Ticket Management</h2>
          <p>Create, edit, and track tickets easily.</p>
        </div>

        {/* ====== Form ====== */}
        <form className="ticket-form" onSubmit={handleSubmit} noValidate>
          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              aria-describedby={error.title ? "title-error" : undefined}
            />
            {error.title && <span id="title-error" className="error">{error.title}</span>}
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              aria-describedby={error.description ? "desc-error" : undefined}
            />
            {error.description && <span id="desc-error" className="error">{error.description}</span>}
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              aria-describedby={error.status ? "status-error" : undefined}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {error.status && <span id="status-error" className="error">{error.status}</span>}
          </label>

          <button type="submit" className="btn-primary">
            {editingId ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>

        {/* ====== Ticket List ====== */}
        <section className="ticket-list">
          {tickets.length === 0 ? (
            <p className="empty-state">No tickets yet.</p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-card ${ticket.status}`}
                aria-label={`Ticket ${ticket.title}`}
              >
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <span className={`status ${ticket.status}`}>{ticket.status.replace("_", " ")}</span>
                </div>
                {ticket.description && <p>{ticket.description}</p>}
                <div className="ticket-actions">
                  <button onClick={() => handleEdit(ticket)}>Edit</button>
                  <button onClick={() => handleDelete(ticket.id)} className="delete">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
