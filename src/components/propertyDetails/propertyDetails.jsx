import React, { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DefImage from "../../assets/PropertyImages/default.jpg";
import propertiesData from "../../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import FavoritesBar from "../favoritesBar/favoritesBar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TabContent from "react-bootstrap/TabContent";
import FloorPlanImage from "../../assets/PropertyImages/Floor-Plan.png";
import { FavoritesContext } from "../../context/favoritesContext.js";

import "./propertyDetails.css";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * PropertyDetails component renders detailed information about a specific property.
 * It uses the `id` from URL parameters to find the relevant property data.
 * The component includes an image gallery, property details, and tabs for additional information
 * such as long description, floor plan, and a Google Map view.
 * Users can navigate back to search results or add the property to favorites.
 *
 * - Utilizes React Router for navigation and location handling.
 * - Dynamically loads property images using `require.context`.
 * - Integrates with the FavoritesContext to provide "Add to Favorite" functionality.
 * - Displays additional property details in tabs with React Tabs library.
 */

/******  6d29d658-90bb-4788-b525-f996624e54ef  *******/
function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const property = propertiesData.properties.find((p) => p.id === id);
  const { addFavorite } = useContext(FavoritesContext);

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
    "living-room.jpg",
    "bathroom.jpg",
  ];
  const images = imageNames.map((name) => {
    try {
      return {
        original: basePath(`./${property.id}/${name}`),
        thumbnail: basePath(`./${property.id}/thumbnails/${name}`),
      };
    } catch (error) {
      console.error(`Image not found: ${name}`);
      return {
        original: DefImage,
        thumbnail: DefImage,
      };
    }
  });

  return (
    <Container fluid className="property-details">
      <Row>
        <Col md={9}>
          <Button
            variant="primary"
            className="back-btn mb-4"
            onClick={handleBackClick}
          >
            Back to Search Results
          </Button>

          <Row>
            <Col md={8}>
              <ImageGallery items={images} showPlayButton={false} />
            </Col>
            <Col md={4}>
              <Card className="property-info">
                <Card.Body>
                  <Card.Title>{property.type}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {property.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> £{property.price.toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </Card.Text>
                  <Card.Text>
                    <strong>Tenure:</strong> {property.tenure}
                  </Card.Text>
                  <Card.Text>
                    <strong>Date Added:</strong>{" "}
                    {`${property.added.day} ${property.added.month} ${property.added.year}`}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addFavorite(property)}
                  >
                    Add to Favorite
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Tabs>
            <TabList className="react-tabs__tab-list rounded">
              <Tab>Long Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Google Map</Tab>
            </TabList>
            <TabPanel>
              <TabContent>
                <p>{property.description}</p>
              </TabContent>
            </TabPanel>
            <TabPanel>
              <TabContent>
                <img
                  src={FloorPlanImage}
                  alt="Floor Plan"
                  className="img-fluid"
                />
              </TabContent>
            </TabPanel>
            <TabPanel>
              <TabContent>
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
              </TabContent>
            </TabPanel>
          </Tabs>
        </Col>

        <Col md={3}>
          <FavoritesBar />
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyDetails;
