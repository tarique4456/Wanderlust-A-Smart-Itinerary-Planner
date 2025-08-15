// 📄 src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!userEmail;

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    alert("✅ Logout successful!");
    window.location.href = "/"; // ✅ Full reload to Home
  };

  return (
    <nav className="navbar">
      <h1>🌍 Wanderlust</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/saved">Saved Plans</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile" className="profile-link">
                👤 {userEmail}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
