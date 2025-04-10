import React, { useContext } from "react"; // Import necessary modules and hooks from React
import { useParams, useNavigate, useLocation } from "react-router-dom";
// Import Images and data
import DefImage from "../../assets/PropertyImages/default.jpg";
import propertiesData from "../../data/properties.json";

// Import necessary components
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

// Import context
import { FavoritesContext } from "../../context/favoritesContext.js";
// Import CSS for styling
import "./propertyDetails.css";

const API_KEY = "AIzaSyDDyygiZ9eUMZlCtm3MMkewpPU4I_EFFSw";

function PropertyDetails() {
  const { id } = useParams(); // Get property ID from URL parameters
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Location hook
  const property = propertiesData.properties.find((p) => p.id === id); // Find property by ID
  const { addFavorite } = useContext(FavoritesContext); // Get addFavorite function from context

  const handleBackClick = () => {
    if (location.state && location.state.fromSearch) {
      navigate(location.state.fromSearch); // Navigate back to search results
    } else {
      navigate(-1); // Navigate back to previous page
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
                    <strong>Price:</strong> Rs.{property.price.toLocaleString()}
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
                  src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(
                    property.location
                  )}`}
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
