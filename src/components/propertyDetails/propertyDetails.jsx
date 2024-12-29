import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import propertiesData from "../../data/properties.json";
import "./propertyDetails.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const property = propertiesData.properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePaths = [];
      for (let i = 1; i <= property.pictures.length; i++) {
        imagePaths.push(`/images/properties/${id}/image${i}.jpg`);
      }
      setImages(imagePaths);
      setSelectedImage(imagePaths[0]);
    };
    loadImages();
  }, [id, property.pictures.length]);

  if (!property) {
    return <h2>Property not found</h2>;
  }

  const handleBackClick = () => {
    if (location.state && location.state.fromSearch) {
      navigate(location.state.fromSearch);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="property-details">
      <button className="back-button" onClick={handleBackClick}>
        Back to Search Results
      </button>
      <div className="property-image">
        <img src={selectedImage} alt={property.type} />
      </div>
      <div className="property-thumbnails">
        {images.map((picture, index) => (
          <img
            key={index}
            src={picture}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(picture)}
            className={selectedImage === picture ? "selected-thumbnail" : ""}
          />
        ))}
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
