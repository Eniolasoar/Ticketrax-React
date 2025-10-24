import React, { useEffect } from "react";
import { getSession, logoutUser } from "../utils/auth";

export default function Dashboard() {
  useEffect(() => {
    const session = getSession();
    if (!session) window.location.href = "/auth/login";
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/";
  };

  const user = getSession();

  return (
    <main className="dashboard">
      <h1>Welcome, {user?.username || "User"} 👋</h1>
      <p>You’re logged in to the Ticketrax Dashboard.</p>
      <button onClick={handleLogout} className="btn-primary">Logout</button>
    </main>
  );
}
