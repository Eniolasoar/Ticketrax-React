import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../../src/components/styles/ticket.css";
import Footer from "../components/shared/Footer";

export const TicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "low",
  });
  const [error, setError] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ✅ Load tickets & validate session
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      navigate("/auth/login");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(stored);
  }, [navigate]);

  // ✅ Save tickets
  const saveTickets = (data) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(data));
    setTickets(data);
  };

  // ✅ Validate form
  const validate = () => {
    const newError = {};
    if (!form.title.trim()) newError.title = "Title is required.";
    if (!form.description.trim()) newError.description = "Description is required.";
    if (form.description.length > 300)
      newError.description = "Description must be under 300 characters.";
    if (!["open", "in_progress", "closed"].includes(form.status))
      newError.status = "Invalid status.";
    if (!["low", "medium", "high"].includes(form.priority))
      newError.priority = "Invalid priority.";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // ✅ Handle Create / Update
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
    setForm({ title: "", description: "", status: "open", priority: "low" });
    setEditingId(null);
    setShowModal(false);
  };

  // ✅ Edit Ticket
  const handleEdit = (ticket) => {
    setForm(ticket);
    setEditingId(ticket.id);
    setShowModal(true);
  };

  // ✅ Delete Ticket
  const confirmDeleteTicket = (id) => setConfirmDelete(id);

  const handleDelete = () => {
    const filtered = tickets.filter((t) => t.id !== confirmDelete);
    saveTickets(filtered);
    setConfirmDelete(null);
    setToast({ type: "info", message: "Ticket deleted successfully." });
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    setToast({ type: "success", message: "Logged out successfully." });
    setTimeout(() => navigate("/auth/login"), 800);
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* ====== Top Navbar (Mobile) ====== */}
      <header className="mobile-header" role="banner">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
          aria-label="Toggle sidebar menu"
        >
          ☰
        </button>
        <h1 className="mobile-title">Ticketrax</h1>
      </header>

      {/* ====== Sidebar ====== */}
      <aside
        id="sidebar"
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Main sidebar navigation"
      >
        <h2 className="logo">Ticketrax</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            </li>
            <li>
              <button onClick={() => navigate("/tickets")}>Ticket Management</button>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ====== Main Content ====== */}
      <main className="dashboard-main" role="main">
        <div className="content-header">
          <div>
            <h2>Ticket Management</h2>
            <p>Manage, track, and update all your tickets efficiently.</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowModal(true)}
            aria-haspopup="dialog"
            aria-controls="create-ticket-modal"
          >
            + Create Ticket
          </button>
        </div>

        {/* ====== Ticket List ====== */}
        <section
          className="ticket-list"
          aria-label="List of all tickets"
        >
          {tickets.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No tickets yet. Start by creating one below.</p>
             
            </div>
          ) : (
            <ul className="ticket-grid">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className={`ticket-card ${ticket.status}`}
                  tabIndex="0"
                  aria-label={`Ticket titled ${ticket.title}, status ${ticket.status}, priority ${ticket.priority}`}
                >
                  <header className="ticket-header">
                    <h3>{ticket.title}</h3>
                    <span className={`status ${ticket.status}`}>
                      {ticket.status.replace("_", " ")}
                    </span>
                  </header>

                  <span
                    className={`priority-pill ${ticket.priority}`}
                    aria-label={`Priority ${ticket.priority}`}
                  >
                    {ticket.priority}
                  </span>

                  {ticket.description && <p>{ticket.description}</p>}

                  <div className="ticket-actions">
                    <button onClick={() => handleEdit(ticket)}>Edit</button>
                    <button
                      onClick={() => confirmDeleteTicket(ticket.id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Footer />
      </main>

      {/* ====== Modal ====== */}
      {showModal && (
        <div
          id="create-ticket-modal"
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            <header>
              <h3 id="modal-title">{editingId ? "Edit Ticket" : "Create Ticket"}</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setError({});
                }}
                aria-label="Close modal"
                className="close-btn"
              >
                ✕
              </button>
            </header>

            <form className="ticket-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                aria-invalid={!!error.title}
                aria-describedby={error.title ? "title-error" : undefined}
              />
              {error.title && (
                <span id="title-error" className="error">
                  {error.title}
                </span>
              )}

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                aria-invalid={!!error.description}
                aria-describedby={error.description ? "desc-error" : undefined}
              />
              {error.description && (
                <span id="desc-error" className="error">
                  {error.description}
                </span>
              )}

              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                aria-invalid={!!error.status}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {error.status && (
                <span id="status-error" className="error">
                  {error.status}
                </span>
              )}

              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button type="submit" className="btn-primary">
                {editingId ? "Update Ticket" : "Create Ticket"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====== Delete Confirmation ====== */}
      {confirmDelete && (
        <div
          className="confirm-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="confirm-box">
            <h4 id="confirm-title">Confirm Deletion</h4>
            <p>Are you sure you want to delete this ticket?</p>
            <div className="confirm-actions">
              <button onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button onClick={handleDelete} className="delete">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};
