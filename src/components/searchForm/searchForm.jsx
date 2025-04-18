import React, { useState } from "react"; // Import necessary modules and hooks from React

import "./searchForm.css"; // Import CSS for styling
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// Import necessary components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Slider from "@mui/material/Slider";
import DatePicker from "react-date-picker";

const SearchForm = ({ onSearch }) => {
  // State variables for form inputs
  const [location, setLocation] = useState("");
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle form submission
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
    onSearch(searchParams); // Call onSearch with search parameters
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit}>
      <Container className="search-form-container">
        <Row className="mb-3">
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="type">
              <Form.Label>Type:</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="bungalow">Bungalow</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <DatePicker
                className={"custom-date-picker"}
                onChange={setStartDate}
                value={startDate}
                clearIcon={null}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <DatePicker
                className={"custom-date-picker"}
                onChange={setEndDate}
                value={endDate}
                clearIcon={null}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="minPrice">
              <Form.Label>Min Price:</Form.Label>
              <Slider
                value={minPrice}
                onChange={(e, value) => setMinPrice(value)}
                valueLabelDisplay="auto"
                step={100000}
                min={0}
                max={1000000}
                sx={{
                  color: "var(--primary-color)",
                }}
              />
              <Form.Text className="slider-label">{minPrice}</Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="maxPrice">
              <Form.Label>Max Price:</Form.Label>
              <Slider
                value={maxPrice}
                onChange={(e, value) => setMaxPrice(value)}
                valueLabelDisplay="auto"
                step={100000}
                min={0}
                max={1000000}
                sx={{
                  color: "var(--primary-color)",
                }}
              />
              <Form.Text className="slider-label">{maxPrice}</Form.Text>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="minBedrooms">
              <Form.Label>Min Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
                placeholder="Min Bedrooms"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Group controlId="maxBedrooms">
              <Form.Label>Max Bedrooms:</Form.Label>
              <Form.Control
                type="number"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(e.target.value)}
                placeholder="Max Bedrooms"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} lg={4}>
            <Form.Group controlId="postcode">
              <Form.Label>Postcode:</Form.Label>
              <Form.Control
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter postcode"
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={8} className="d-flex align-items-end">
            <Button type="submit" className="w-100 search-btn">
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default SearchForm;
