import React, { useContext } from "react"; // Import necessary modules and hooks from React

import { Link } from "react-router-dom"; // Import Components
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DefImage from "../../assets/PropertyImages/default.jpg";

import { FavoritesContext } from "../../context/favoritesContext"; // Import FavoritesContext for managing favorite properties

import "./propertyList.css"; // Import CSS for styling

function PropertyList({ properties, onDragStart }) {
  const { addFavorite } = useContext(FavoritesContext); // Use FavoritesContext to get addFavorite function

  if (properties.length === 0) {
    return <p>No properties match your search criteria.</p>; // Display message if no properties are available
  }

  return (
    <Row className="property-list">
      {properties.map((property) => {
        let imagePath;
        try {
          imagePath = require(`../../assets/PropertyImages/${property.id}/${property.picture}`); // Try to load property image
        } catch (error) {
          console.error(
            `Image not found for property ${property.id}: ${property.picture}`
          );
          imagePath = DefImage; // Fallback image path
        }

        return (
          <Col xs={12} sm={6} md={4} lg={3} key={property.id}>
            <Card
              className="property-card h-100 glass"
              draggable
              onDragStart={(e) => onDragStart(e, property.id)} // Handle drag start event
            >
              <Link to={`/property/${property.id}`}>
                <Image
                  src={imagePath}
                  alt={property.type}
                  className="card-img-top"
                  fluid
                />

                <Card.Body>
                  <Card.Title>{property.location}</Card.Title>
                  <Card.Subtitle>{property.type}</Card.Subtitle>
                  <Card.Text>
                    <strong>Price:</strong> Rs.{property.price.toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      addFavorite(property); // Add property to favorites
                    }}
                  >
                    Add to Favorites
                  </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default PropertyList; // Export PropertyList component
