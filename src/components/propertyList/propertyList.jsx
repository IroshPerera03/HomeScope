import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DefImage from "../../assets/PropertyImages/default.jpg";
import { FavoritesContext } from "../../context/favoritesContext";

import "./propertyList.css";

function PropertyList({ properties, onDragStart }) {
  const { addFavorite } = useContext(FavoritesContext);

  if (properties.length === 0) {
    return <p>No properties match your search criteria.</p>;
  }

  return (
    <Row className="property-list g-3">
      {properties.map((property) => {
        let imagePath;
        try {
          imagePath = require(`../../assets/PropertyImages/${property.id}/${property.picture}`);
        } catch (error) {
          console.error(
            `Image not found for property ${property.id}: ${property.picture}`
          );
          imagePath = DefImage; // Fallback image path
        }

        return (
          <Col xs={12} sm={6} md={4} lg={3} key={property.id}>
            <Card
              className="property-card h-100"
              draggable
              onDragStart={(e) => onDragStart(e, property.id)}
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
                    <strong>Price:</strong> ${property.price.toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      addFavorite(property);
                    }}
                  >
                    ❤️ Add to Favorites
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

export default PropertyList;
