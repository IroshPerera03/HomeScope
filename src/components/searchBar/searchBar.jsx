import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

function SearchBar() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location) {
      navigate(`/property-listing`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!location}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
