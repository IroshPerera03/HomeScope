import React from "react";
import { Link } from "react-router-dom";
import DefImage from "../../assets/PropertyImages/default.jpg";
import "./propertyList.css";

function PropertyList({ properties }) {
  if (properties.length === 0) {
    return <p>No properties match your search criteria.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => {
        //Logic to check for image path and display default image in case no image is found
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
          <div key={property.id} className="property-card">
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
            <Link to={`/property/${property.id}`}>View Details</Link>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyList;
