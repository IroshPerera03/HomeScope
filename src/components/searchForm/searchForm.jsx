import React, { useState } from "react";
import "./searchForm.css";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      dateAdded,
      postcode,
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="any">Any</option>
          <option value="house">House</option>
          <option value="flat">Flat</option>
        </select>
      </div>
      <div>
        <label>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Min Bedrooms:</label>
        <input
          type="number"
          value={minBedrooms}
          onChange={(e) => setMinBedrooms(e.target.value)}
        />
      </div>
      <div>
        <label>Max Bedrooms:</label>
        <input
          type="number"
          value={maxBedrooms}
          onChange={(e) => setMaxBedrooms(e.target.value)}
        />
      </div>
      <div>
        <label>Date Added:</label>
        <input
          type="date"
          value={dateAdded}
          onChange={(e) => setDateAdded(e.target.value)}
        />
      </div>
      <div>
        <label>Postcode:</label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
