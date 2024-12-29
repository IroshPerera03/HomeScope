import React, { useState } from "react";
import "./searchForm.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Slider from "@mui/material/Slider";
import DatePicker from "react-widgets/DatePicker";

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      location,
      type,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      startDate,
      endDate,
      postcode,
    };
    onSearch(searchParams);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Container className="search-form-container">
        <Row sm={1}>
          <Col className="location" lg={3}>
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="transparent-input"
            />
          </Col>
          <Col lg={3}>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="transparent-input"
            >
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </Col>
          <Col className="date-range" lg={3}>
            <label htmlFor="startDate">Start Date:</label>
            <DatePicker
              parse={(str) => new Date(str)}
              placeholder="Start Date"
              defaultValue={null}
              onChange={(e) => setStartDate(e)}
              className="transparent-input"
            />
          </Col>
          <Col className="date-range" lg={3}>
            <label htmlFor="endDate" defaultValue={null}>
              End Date:
            </label>
            <DatePicker
              parse={(str) => new Date(str)}
              placeholder="End Date"
              defaultValue={null}
              onChange={(e) => setEndDate(e)}
              className="transparent-input"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <label htmlFor="minPrice">Min Price:</label>
            <Slider
              aria-label="Min Price"
              value={minPrice}
              onChange={(e, value) => setMinPrice(value)}
              valueLabelDisplay="auto"
              step={100000}
              min={0}
              max={1000000}
              defaultValue={0}
              marks={true}
              className="transparent-input"
            />
            <span>{minPrice}</span>
          </Col>
          <Col lg={2}>
            <label htmlFor="maxPrice">Max Price:</label>
            <Slider
              aria-label="Max Price"
              value={maxPrice}
              onChange={(e, value) => setMaxPrice(value)}
              valueLabelDisplay="auto"
              step={100000}
              min={0}
              max={1000000}
              defaultValue={1000000}
              marks={true}
              className="transparent-input"
            />
            <span>{maxPrice}</span>
          </Col>
          <Col lg={2}>
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <input
              id="minBedrooms"
              type="number"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              placeholder="min bedrooms"
              className="transparent-input"
            />
          </Col>
          <Col lg={2}>
            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <input
              id="maxBedrooms"
              type="number"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
              placeholder="max bedrooms"
              className="transparent-input"
            />
          </Col>
          <Col lg={4}>
            <label htmlFor="postcode">Postcode:</label>
            <input
              id="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="postalcode"
              className="transparent-input"
            />
          </Col>
        </Row>
        <Row lg={3}>
          <button type="submit">Search</button>
        </Row>
      </Container>
    </form>
  );
};

export default SearchForm;
