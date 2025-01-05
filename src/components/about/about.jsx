import React from "react";
import { Typography, Container, Box } from "@mui/material";

import "./about.css"; // Import the CSS file

const AboutPage = () => {
  return (
    <Container className="about-container">
      <div elevation={3} className="about-container">
        <Typography variant="h4" component="h1" className="about-header">
          About This Project
        </Typography>

        <Typography variant="body1" paragraph className="about-paragraph">
          Welcome to the Property Search Application, a modern and intuitive
          platform designed to simplify your property hunting journey. Whether
          you're looking for a cozy apartment or a spacious home, our
          application provides a seamless experience to help you find exactly
          what you need.
        </Typography>

        <Box>
          <Typography variant="h5" component="h2" className="about-subheader">
            Key Features
          </Typography>
          <Typography variant="body1" paragraph className="about-paragraph">
            <span className="about-highlight">Advanced Filtering:</span> Search
            for properties by location, type, price range, and bedroom count
            using dynamic and responsive widgets. <br />
            <span className="about-highlight">Modern Design:</span> A sleek,
            React-based user interface designed with Material-UI components and
            enhanced with a light/dark mode toggle for personalized viewing
            preferences.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" component="h2" className="about-subheader">
            Why This Project?
          </Typography>
          <Typography variant="body1" paragraph className="about-paragraph">
            This application marks a significant milestone as my{" "}
            <span className="about-highlight">
              first large-scale React project
            </span>
            . It is a blend of academic learning, professional growth, and
            personal ambition.
          </Typography>
          <ul className="about-list">
            <li>Geolocation-based property suggestions</li>
            <li>Machine learning for personalized recommendations</li>
            <li>Cross-platform compatibility for mobile users</li>
          </ul>
        </Box>
      </div>
    </Container>
  );
};

export default AboutPage;
