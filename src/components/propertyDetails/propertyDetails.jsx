import React from "react";
import DefImage from "../../assets/PropertyImages/default.jpg";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import propertiesData from "../../data/properties.json";
import "./propertyDetails.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoritesBar from "../favoritesBar/favoritesBar.jsx"; // Import FavoritesBar

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

  // Dynamically load images with require.context
  const basePath = require.context(
    "../../assets/PropertyImages",
    true,
    /\.(png|jpe?g|svg)$/ // Match file extensions
  );

  const imageNames = [
    "kitchen.jpg",
    "bedroom.jpg",
    "livingroom.jpg",
    "bathroom.jpg",
  ];
  const images = imageNames.map((name) => {
    try {
      return {
        original: basePath(`./${property.id}/${name}`), // Path to the full-size image
        thumbnail: basePath(`./${property.id}/thumbnails/${name}`), // Path to the thumbnail
      };
    } catch (error) {
      console.error(`Image not found: ${name}`);
      return {
        original: DefImage, // Fallback image
        thumbnail: DefImage, // Fallback image
      };
    }
  });

  return (
    <div className="container property-details">
      <div className="main-content">
        <button
          className="btn btn-primary back-button"
          onClick={handleBackClick}
        >
          Back to Search Results
        </button>

        <div className="row">
          <div className="col-md-8">
            <div className="property-gallery">
              <ImageGallery items={images} showPlayButton={false} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card property-info">
              <div className="card-body">
                <h1 className="card-title">{property.type}</h1>
                <p className="card-text">
                  <strong>Location:</strong> {property.location}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> £{property.price.toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p className="card-text">
                  <strong>Tenure:</strong> {property.tenure}
                </p>
                <p className="card-text">
                  <strong>Date Added:</strong>{" "}
                  {`${property.added.day} ${property.added.month} ${property.added.year}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab>Long Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Google Map</Tab>
          </TabList>

          <TabPanel>
            <p>{property.description}</p>
          </TabPanel>
          <TabPanel>
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              className="img-fluid"
            />
          </TabPanel>
          <TabPanel>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${
                process.env.REACT_APP_GOOGLE_MAPS_API_KEY
              }&q=${encodeURIComponent(property.location)}`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </TabPanel>
        </Tabs>
      </div>
      <div className="right-section">
        <FavoritesBar />
      </div>
    </div>
  );
}

export default PropertyDetails;
