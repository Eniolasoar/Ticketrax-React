import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "../../src/components/styles/dashboard.css";
import Footer from "../components/shared/Footer";

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

  // ✅ Session & data validation
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

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    setToast({ type: "success", message: "Logged out successfully." });
    setTimeout(() => navigate("/auth/login"), 1000);
  };

  // ✅ Navigation helper
  const goToTickets = () => {
    navigate("/tickets");
  };

  return (
    <div
      className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}
      role="application"
    >
      {/* ====== Mobile Header ====== */}
      <header className="mobile-header" role="banner">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar menu"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
        >
          ☰
        </button>
        <h1 className="mobile-title">Ticketrax Dashboard</h1>
      </header>

      {/* ====== Sidebar ====== */}
      <aside
        id="sidebar"
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <h2 className="logo" tabIndex="0">
          Ticketrax
        </h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                aria-current="page"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/tickets")}>
                Ticket Management
              </button>
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
      <main
        className="dashboard-main"
        style={{ position: "relative" }}
        role="main"
      >
        <section className="content-header" aria-labelledby="dashboard-title">
          <div>
            <h2 id="dashboard-title">Dashboard Overview</h2>
            <p>Welcome back! Here’s an overview of your tickets.</p>
          </div>
          <button
            className="btn-primary"
            onClick={goToTickets}
            aria-label="Go to Ticket Management page"
          >
            Go to Ticket Management
          </button>
        </section>

        {/* ====== Stats Section ====== */}
        <section
          className="stats-grid"
          aria-labelledby="stats-heading"
          role="region"
        >
          

          <div
            className="stat-card"
            role="status"
            aria-label={`Total tickets: ${stats.total}`}
            tabIndex="0"
          >
            <h4>Total Tickets</h4>
            <p>{stats.total}</p>
          </div>

          <div
            className="stat-card open"
            role="status"
            aria-label={`Open tickets: ${stats.open}`}
            tabIndex="0"
          >
            <h4>Open Tickets</h4>
            <p>{stats.open}</p>
          </div>

          <div
            className="stat-card in-progress"
            role="status"
            aria-label={`Tickets in progress: ${stats.in_progress}`}
            tabIndex="0"
          >
            <h4>In Progress</h4>
            <p>{stats.in_progress}</p>
          </div>

          <div
            className="stat-card closed"
            role="status"
            aria-label={`Closed tickets: ${stats.closed}`}
            tabIndex="0"
          >
            <h4>Closed</h4>
            <p>{stats.closed}</p>
          </div>
        </section>

        {/* ====== Footer ====== */}
        <Footer />
      </main>

      {/* ====== Toast Notification ====== */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Dashboard;
