import React, { useState } from "react";
import propertiesData from "../../data/properties.json";
import PropertyList from "../propertyList/propertyList.jsx";
import "../search/search.css";
import SearchForm from "../searchForm/searchForm.jsx";

function Search() {
  const [filteredProperties, setFilteredProperties] = useState(
    propertiesData.properties
  );

  const handleSearch = (searchParams) => {
    const results = propertiesData.properties.filter((property) => {
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
        (searchParams.dateAdded === "" ||
          new Date(property.dateAdded) >= new Date(searchParams.dateAdded)) &&
        (searchParams.postcode === "" ||
          property.location
            .toLowerCase()
            .includes(searchParams.postcode.toLowerCase()));
      return matches;
    });
    setFilteredProperties(results);
  };

  return (
    <div className="search-page">
      <SearchForm onSearch={handleSearch} />
      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default Search;
