// 📄 src/pages/Login.js

import React, { useState } from "react";
import "../styles/Auth.css";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        localStorage.setItem("userEmail", email);
        setMsg("✅ Login successful!");
        setIsSuccess(true);

        setTimeout(() => {
          onLogin(email);
          navigate("/");
        }, 1000);
      } else {
        const errText = await res.text();
        setMsg("❌ " + errText);
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Login failed.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>
        <FaSignInAlt /> Login
      </h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {msg && (
        <p
          style={{
            color: isSuccess ? "green" : "red",
            fontWeight: "500",
            marginTop: "12px",
          }}
        >
          {msg}
        </p>
      )}
    </div>
  );
};

export default Login;
