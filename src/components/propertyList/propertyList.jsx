import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DefImage from "../../assets/PropertyImages/default.jpg";
import { FavoritesContext } from "../../context/favoritesContext";
import "./propertyList.css";

function PropertyList({ properties, onDragStart }) {
  const { addFavorite } = useContext(FavoritesContext);

  if (properties.length === 0) {
    return <p>No properties match your search criteria.</p>;
  }

  return (
    <div className="property-list">
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
          <Link
            key={property.id}
            to={`/property/${property.id}`}
            className="property-card"
            draggable
            onDragStart={(e) => onDragStart(e, property.id)}
          >
            <img src={imagePath} alt={property.type} />
            <h3>{property.type}</h3>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Price:</strong> ${property.price.toLocaleString()}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <button
              className="favorite-icon"
              onClick={(e) => {
                e.preventDefault();
                addFavorite(property);
              }}
            >
              ❤️
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default PropertyList;
