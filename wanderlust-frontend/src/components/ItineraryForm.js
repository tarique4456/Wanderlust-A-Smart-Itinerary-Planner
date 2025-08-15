// 📄 File: src/components/ItineraryForm.js
import React, { useState } from "react";
import "../App.css";
import { getUserFromSession } from "../utils/auth"; // ✅ Import session utility

const ItineraryForm = ({ onItineraryGenerated }) => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userEmail = getUserFromSession();
    if (!userEmail) {
      setError("Please login to generate an itinerary.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          days: parseInt(days),
          interests,
          budget: parseInt(budget),
          userEmail, // ✅ Automatically included
        }),
      });

      const result = await response.text();
      onItineraryGenerated(result); // pass back to Home
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>🧳 Smart Itinerary Generator</h3>
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
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ItineraryForm;
