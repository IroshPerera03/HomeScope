import React, { useState, useContext } from "react";
import propertiesData from "../../data/properties.json";
import PropertyList from "../propertyList/propertyList.jsx";
import "../search/search.css";
import SearchForm from "../searchForm/searchForm.jsx";
import FavoritesBar from "../favoritesBar/favoritesBar.jsx";
import { FavoritesContext } from "../../context/favoritesContext.js";

function parseAddedToDate(added) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(added.month);
  if (monthIndex === -1) {
    throw new Error(`Invalid month: ${added.month}`);
  }
  return new Date(added.year, monthIndex, added.day);
}

function Search() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const { addFavorite } = useContext(FavoritesContext);

  const handleDrop = (event) => {
    event.preventDefault();
    const propertyId = event.dataTransfer.getData("propertyId");
    const property = propertiesData.properties.find((p) => p.id === propertyId);
    if (property) addFavorite(property);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSearch = (searchParams) => {
    const results = propertiesData.properties.filter((property) => {
      const date = parseAddedToDate(property.added);
      const matches =
        (searchParams.location === "" ||
          property.location
            .toLowerCase()
            .includes(searchParams.location.toLowerCase())) &&
        (searchParams.type === "any" ||
          property.type.toLowerCase() === searchParams.type.toLowerCase()) &&
        (searchParams.minPrice === "" ||
          property.price >= searchParams.minPrice) &&
        (searchParams.maxPrice === "" ||
          property.price <= searchParams.maxPrice) &&
        (searchParams.minBedrooms === "" ||
          property.bedrooms >= searchParams.minBedrooms) &&
        (searchParams.maxBedrooms === "" ||
          property.bedrooms <= searchParams.maxBedrooms) &&
        ((searchParams.startDate === null && searchParams.endDate === null) ||
          (date >= new Date(searchParams.startDate) &&
            date <= new Date(searchParams.endDate))) &&
        (searchParams.postcode === "" ||
          property.location
            .toLowerCase()
            .includes(searchParams.postcode.toLowerCase()));
      return matches;
    });
    setFilteredProperties(results);
    setSearchPerformed(true);
  };

  return (
    <div className="search-page">
      <div className="main-container">
        <div className="main-content">
          <SearchForm onSearch={handleSearch} />
          {searchPerformed && (
            <PropertyList
              properties={filteredProperties}
              draggable
              onDragStart={(e, propertyId) =>
                e.dataTransfer.setData("propertyId", propertyId)
              }
            />
          )}
        </div>
        <div
          className={`right-section ${favoritesVisible ? "visible" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FavoritesBar />
        </div>
      </div>
      <button
        className="toggle-favorites-button"
        onClick={() => setFavoritesVisible(!favoritesVisible)}
      >
        {favoritesVisible ? "Hide Favorites" : "Show Favorites"}
      </button>
    </div>
  );
}

export default Search;
