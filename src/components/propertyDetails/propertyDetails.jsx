import React from "react";
import DefImage from "../../assets/PropertyImages/default.jpg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import propertiesData from "../../data/properties.json";
import "./propertyDetails.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import KitchenImage from "../../assets/PropertyImages/prop2/kitchen.jpg";
function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const property = propertiesData.properties.find((p) => p.id === id);

  const handleBackClick = () => {
    if (location.state && location.state.fromSearch) {
      navigate(location.state.fromSearch);
    } else {
      navigate(-1);
    }
  };

  // Base path for images
  const basePath = require.context("../../assets/PropertyImages", true);

  // Dynamically generate image paths
  const imageNames = [
    "kitchen.jpg",
    "bedroom.jpg",
    "living-room.jpg",
    "bathroom.jpg",
  ]; // Add or adjust names as needed
  const images = imageNames.map((name) => {
    try {
      return {
        original: basePath(`/${property.id}/${name}`), // Path to the full-size image
        thumbnail: basePath(`/${property.id}/thumbnail/${name}`), // Path to the thumbnail
      };
    } catch (error) {
      console.error(`Image not found: ${basePath}${name}`);
      return {
        original: DefImage, // Fallback image
        thumbnail: DefImage, // Fallback image
      };
    }
  });

  return (
    <div className="property-details">
      <button className="back-button" onClick={handleBackClick}>
        Back to Search Results
      </button>
      <div className="property-gallery">
        <ImageGallery items={images} showPlayButton={false} />
      </div>
      <div className="property-info">
        <h1>{property.type}</h1>
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Price:</strong> £{property.price.toLocaleString()}
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
      <Tabs>
        <TabList>
          <Tab>Long Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.longDescription}</p>
        </TabPanel>
        <TabPanel>
          <img src={property.floorPlan} alt="Floor Plan" />
        </TabPanel>
        <TabPanel>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.location}`}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyDetails;
