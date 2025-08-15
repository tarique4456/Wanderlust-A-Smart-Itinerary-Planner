// ✅ FILE: src/pages/Home.js
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import ItineraryList from "../components/ItineraryList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Success message
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setError("⚠ Please login to generate an itinerary.");
      return;
    }

    setError("");
    setItinerary("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          days: parseInt(days),
          interests,
          budget: parseInt(budget),
          userEmail,
        }),
      });

      const result = await response.text();
      setItinerary(result);
      setSuccess("✅ Itinerary generated successfully!");

      // ✅ Clear form fields
      setDestination("");
      setDays("");
      setInterests("");
      setBudget("");
    } catch (err) {
      setError("❌ Failed to generate itinerary.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <h2>Plan Your Next Adventure 🏝</h2>
        <p>AI-powered smart itinerary planner just for you.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Destination (e.g., Manali)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Interests (e.g., adventure, food)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget in ₹"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <button type="submit">Generate Itinerary</button>
      </form>
      {loading && <p>✈ Generating itinerary...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}{" "}
      {/* ✅ Success message */}
      {itinerary && (
        <div className="itinerary">
          <h3>Your Itinerary:</h3>
          <pre style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
            {itinerary}
          </pre>
        </div>
      )}
      <hr style={{ margin: "40px 0" }} />
      <h3>📌 Saved Itineraries</h3>
      {/* ✅ Show only first few itineraries on Home */}
      <ItineraryList userEmail={userEmail} limit={2} hideFilter={true} />
      {/* ✅ Show More Button - only for logged-in users */}
      {userEmail && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/saved")}
            className="show-more-button"
          >
            ➕ Show More
          </button>
        </div>
      )}
      <button
        className="chatbot-button"
        onClick={() => alert("💬 Travel Assistant coming soon!")}
      >
        💬 Ask Travel Assistant
      </button>
      <Footer />
    </div>
  );
};

export default Home;
