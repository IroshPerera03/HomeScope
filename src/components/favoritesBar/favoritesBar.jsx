import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FavoritesContext } from "../../context/favoritesContext.js";
import "./favoritesBar.css";

const FavoritesBar = () => {
  const { favorites, removeFavorite, clearFavorites } =
    useContext(FavoritesContext); // Get favorites and functions from context
  const favoritesBarRef = useRef(null); // Reference to favorites bar

  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("text/plain", propertyId); // Set property ID on drag start
  };

  const handleDragEnd = (e, propertyId) => {
    const favoritesBarBounds = favoritesBarRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    if (
      clientX < favoritesBarBounds.left ||
      clientX > favoritesBarBounds.right ||
      clientY < favoritesBarBounds.top ||
      clientY > favoritesBarBounds.bottom
    ) {
      removeFavorite(propertyId); // Remove favorite if dragged outside bounds
    }
  };

  return (
    <div className="favorites-bar" ref={favoritesBarRef}>
      <h2>Favorites</h2>
      {favorites.length > 0 && (
        <Button
          variant="outline-danger"
          size="sm"
          className="w-100"
          onClick={clearFavorites}
        >
          Clear All
        </Button>
      )}
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div>
          {favorites.map((property) => {
            const imagePath = require(`../../assets/PropertyImages/${property.id}/${property.picture}`);
            return (
              <Card
                key={property.id}
                className="favorite-item mb-3"
                draggable
                onDragStart={(e) => handleDragStart(e, property.id)}
                onDragEnd={(e) => handleDragEnd(e, property.id)}
              >
                <Link to={`/property/${property.id}`} className="favorite-link">
                  <Card.Img
                    variant="top"
                    src={imagePath}
                    alt={property.name}
                    className="favorite-item-img"
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{property.name}</Card.Title>
                  <Card.Text>{property.location}</Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFavorite(property.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesBar;
