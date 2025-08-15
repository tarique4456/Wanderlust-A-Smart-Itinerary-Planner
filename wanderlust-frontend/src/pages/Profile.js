

// 📄 src/pages/Profile.js
import React, { useEffect, useState } from "react";
import "../styles/Auth.css";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const Profile = () => {
  const email = localStorage.getItem("userEmail");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/api/users/${email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Profile not found");
          return res.json();
        })
        .then((data) => setProfile(data))
        .catch((err) => setError(err.message));
    }
  }, [email]);

  if (!email)
    return (
      <div className="auth-container">
        <p className="error-msg">⚠ Please login to view profile.</p>
      </div>
    );

  if (error)
    return (
      <div className="auth-container">
        <p className="error-msg">❌ {error}</p>
      </div>
    );

  return (
    <div className="auth-container">
      <h2>👤 My Profile</h2>

      {profile ? (
        <div className="auth-card profile-card">
          <div className="profile-row">
            <FaUser className="profile-icon" />
            <span>
              <strong>Name:</strong> {profile.name}
            </span>
          </div>
          <div className="profile-row">
            <FaEnvelope className="profile-icon" />
            <span>
              <strong>Email:</strong> {profile.email}
            </span>
          </div>
          {profile.phone && (
            <div className="profile-row">
              <FaPhone className="profile-icon" />
              <span>
                <strong>Phone:</strong> {profile.phone}
              </span>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
