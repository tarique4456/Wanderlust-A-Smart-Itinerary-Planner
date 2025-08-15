// src/pages/SavedItineraries.js
import React from "react";
import ItineraryList from "../components/ItineraryList";
import "../styles/SavedItineraries.css";

const SavedItineraries = ({ userEmail }) => {
  return (
    <div className="saved-container">
      <h2>📁 Your Saved Travel Plans</h2>
      <ItineraryList userEmail={userEmail} />
    </div>
  );
};

export default SavedItineraries;
