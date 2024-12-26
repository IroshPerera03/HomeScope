import React from "react";
import { Link } from "react-router-dom";
import "./propertyList.css";

function PropertyList({ properties }) {
  if (properties.length === 0) {
    return <p>No properties match your search criteria.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.picture} alt={property.type} />
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
      ))}
    </div>
  );
}

export default PropertyList;
