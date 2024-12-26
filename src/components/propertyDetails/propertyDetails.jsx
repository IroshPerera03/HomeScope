import React from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../../data/properties.json";
import "./propertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const property = propertiesData.properties.find((p) => p.id === id);

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div className="property-details">
      <div className="property-image">
        <img src={property.picture} alt={property.type} />
      </div>
      <div className="property-info">
        <h1>{property.type}</h1>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Price:</strong> ${property.price.toLocaleString()}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p>
          <strong>Tenure:</strong> {property.tenure}
        </p>
        <p>
          <strong>Description:</strong> {property.description}
        </p>
        <p>
          <strong>Date Added:</strong>{" "}
          {`${property.added.day} ${property.added.month} ${property.added.year}`}
        </p>
      </div>
    </div>
  );
}

export default PropertyDetails;
