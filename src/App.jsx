import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/auth/login" replace />;
}

function AuthRedirect({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route
          path="/auth/signup"
          element={
            <AuthRedirect>
             <Signup />
            </AuthRedirect>
          }
        />
        <Route
          path="/auth/login"
          element={
            <AuthRedirect>
             <Login />
            </AuthRedirect>
          }
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
