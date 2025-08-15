// 📄 src/components/ItineraryList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../components/ItineraryList.css";

const DESTINATIONS = [
  "Manali",
  "Goa",
  "Ladakh",
  "Kerala",
  "Jaipur",
  "Varanasi",
];
const INTERESTS = [
  "Adventure",
  "Food",
  "Culture",
  "Nature",
  "Relaxation",
  "Nightlife",
];

const ItineraryList = ({ limit, hideFilter, showMoreButton }) => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [destinationFilter, setDestinationFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");
  const [daysFilter, setDaysFilter] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const getUserEmail = () => localStorage.getItem("userEmail");

  const fetchItineraries = async (email) => {
    if (!email) {
      setItineraries([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/itinerary/user/${email}`
      );
      const data = await res.json();
      setItineraries(data);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let currentEmail = getUserEmail();
    fetchItineraries(currentEmail);

    const interval = setInterval(() => {
      const updatedEmail = getUserEmail();
      if (updatedEmail !== currentEmail) {
        currentEmail = updatedEmail;
        setLoading(true);
        fetchItineraries(currentEmail);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const clearFilters = () => {
    setDestinationFilter("");
    setInterestFilter("");
    setDaysFilter("");
    setMinBudget("");
    setMaxBudget("");
  };

  const filteredItineraries = itineraries.filter((itinerary) => {
    return (
      (!destinationFilter ||
        itinerary.destination
          .toLowerCase()
          .includes(destinationFilter.toLowerCase())) &&
      (!interestFilter ||
        itinerary.interests
          .toLowerCase()
          .includes(interestFilter.toLowerCase())) &&
      (!daysFilter || itinerary.days === parseInt(daysFilter)) &&
      (!minBudget || itinerary.budget >= parseInt(minBudget)) &&
      (!maxBudget || itinerary.budget <= parseInt(maxBudget))
    );
  });

  // ✅ Apply limit if passed
  const displayedItineraries = limit
    ? filteredItineraries.slice(0, limit)
    : filteredItineraries;

  return (
    <div className="itinerary-list">
      {!hideFilter && getUserEmail() && (
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            marginBottom: "1rem",
            padding: "10px 18px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showFilters ? "Hide Filters 🔽" : "Show Filters 🔼"}
        </button>
      )}

      {showFilters && !hideFilter && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px",
            marginBottom: "20px",
            backgroundColor: "#f8f9fa",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <input
            list="destinations"
            placeholder="Destination"
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            style={inputStyle}
          />
          <datalist id="destinations">
            {DESTINATIONS.map((d, i) => (
              <option key={i} value={d} />
            ))}
          </datalist>

          <input
            list="interests"
            placeholder="Interest"
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            style={inputStyle}
          />
          <datalist id="interests">
            {INTERESTS.map((i, index) => (
              <option key={index} value={i} />
            ))}
          </datalist>

          <input
            type="number"
            placeholder="Days"
            value={daysFilter}
            onChange={(e) => setDaysFilter(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Min Budget ₹"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Max Budget ₹"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={clearFilters}
            style={{
              gridColumn: "span 2",
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            ❌ Clear Filters
          </button>
        </div>
      )}

      {loading && <p>⏳ Loading itineraries...</p>}
      {!loading && displayedItineraries.length === 0 && (
        <p>No itineraries found.</p>
      )}

      <div className="itinerary-cards">
        {[...filteredItineraries]
          .reverse()
          .slice(
            0,
            window.location.pathname === "/" ? 1 : filteredItineraries.length
          )
          .map((itinerary, index) => (
            <div className="saved-itinerary-card" key={index}>
              <h4>📍 {itinerary.destination}</h4>
              <div style={{ marginBottom: "10px", lineHeight: "1.5" }}>
                <p>
                  <strong>Days:</strong> {itinerary.days}
                </p>
                <p>
                  <strong>Interests:</strong> {itinerary.interests}
                </p>
                <p>
                  <strong>Budget:</strong> ₹{itinerary.budget}
                </p>
              </div>
              <p className="generated-itinerary">{itinerary.generatedPlan}</p>
            </div>
          ))}
      </div>

      {/* ✅ Show More Button only on Home */}
      {showMoreButton && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="show-more-button"
            onClick={() => navigate("/saved")}
          >
            ➕ Show More
          </button>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default ItineraryList;
