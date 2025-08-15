// 📄 src/App.js
import Profile from "./pages/Profile";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedItineraries from "./pages/SavedItineraries";

import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaSuitcase,
  FaSave,
} from "react-icons/fa";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("");
    alert("✅ Logout successful!");
    // navigate("/");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Wanderlust</h1>
        <nav>
          <Link to="/">
            <FaSuitcase /> Home
          </Link>
          <Link to="/saved">
            <FaSave /> Saved
          </Link>
          {userEmail ? (
            <>
              {/* ✅ Updated clickable profile link */}
              <Link
                to="/profile"
                style={{
                  color: "white",
                  fontWeight: "500",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                }}
              >
                👤 {userEmail}
              </Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register">
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home userEmail={userEmail} />} />
        <Route
          path="/saved"
          element={<SavedItineraries userEmail={userEmail} />}
        />
        <Route
          path="/login"
          element={
            userEmail ? <Navigate to="/" /> : <Login onLogin={setUserEmail} />
          }
        />
        <Route
          path="/register"
          element={userEmail ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
