import React from "react";
import SearchBar from "../searchBar/searchBar";
import PropertyList from "../propertyList/propertyList";
import propertiesData from "../../data/properties.json";
import "./hero.css";
import { useState } from "react";

function Hero() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );
  const handleSearch = (query) => {
    const result = propertiesData.properties.filter((property) =>
      property.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(result);
  };

  return (
    <section className="hero">
      <div className="overlay">
        <h1>believe in finding it</h1>
        <p>with the UK's largest choice of homes</p>
        <SearchBar onSearch={handleSearch} />
        <PropertyList properties={filteredProperties} />
      </div>
    </section>
  );
}

export default Hero;
