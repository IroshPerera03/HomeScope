import React, { useState } from "react";
import propertiesData from "../../data/properties.json";
import PropertyList from "../propertyList/propertyList.jsx";
import "../search/search.css";
import SearchForm from "../searchForm/searchForm.jsx";

function parseAddedToDate(added) {
  // Convert month name to a numeric value
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
  const monthIndex = monthNames.indexOf(added.month); // 0-based index

  if (monthIndex === -1) {
    throw new Error(`Invalid month: ${added.month}`);
  }

  // Construct the Date object
  return new Date(added.year, monthIndex, added.day);
}

function Search() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (searchParams) => {
    const results = propertiesData.properties.filter((property) => {
      const date = parseAddedToDate(property.added);
      console.log(date);
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
      <SearchForm onSearch={handleSearch} />
      {searchPerformed && <PropertyList properties={filteredProperties} />}
    </div>
  );
}

export default Search;
