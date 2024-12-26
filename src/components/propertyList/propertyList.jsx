import React from "react";
import { Link } from "react-router-dom";

function PropertyList({ properties }) {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.image} alt={property.name} />
          <h3>{property.name}</h3>
          <p>{property.location}</p>
          <p>{property.price}</p>
          <Link to={`/property/${property.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
