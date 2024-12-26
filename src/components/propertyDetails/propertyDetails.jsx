import React from "react";
import { useParams } from "react-router-dom";
import properties from "../../data/properties.json";

function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div className="property-details">
      <img src={property.image} alt={property.name} />
      <h1>{property.name}</h1>
      <p>{property.location}</p>
      <p>{property.price}</p>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetails;
