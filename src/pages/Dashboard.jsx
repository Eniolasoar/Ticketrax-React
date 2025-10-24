import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import '../../src/styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      navigate("/auth/login");
      return;
    }

    const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const in_progress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;

    setStats({ total, open, in_progress, closed });
  }, [navigate]);

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
          <h2>Dashboard</h2>
          <p>Welcome back! Here’s an overview of your tickets.</p>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card open">
            <h3>Open Tickets</h3>
            <p>{stats.open}</p>
          </div>
          <div className="stat-card in-progress">
            <h3>In Progress</h3>
            <p>{stats.in_progress}</p>
          </div>
          <div className="stat-card closed">
            <h3>Closed</h3>
            <p>{stats.closed}</p>
          </div>
        </section>
      </main>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Dashboard;
