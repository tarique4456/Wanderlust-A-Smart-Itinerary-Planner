// 📄 src/components/Footer.js
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">🌍 Wanderlust</div>
        <div className="footer-description">
          Plan your trips smartly with AI-powered itineraries.
        </div>
        <div className="footer-socials">
          <span>
            <FaFacebookF />
          </span>
          <span>
            <FaInstagram />
          </span>
          <span>
            <FaLinkedinIn />
          </span>
        </div>
        <div className="footer-bottom">
          © 2025 Wanderlust. All rights reserved. Tarique Ansari
        </div>
      </div>
    </footer>
  );
};

export default Footer;
