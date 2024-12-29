import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../hero/hero.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DayImg1 from "../../assets/HeroImages/day1.png";
import DayImg2 from "../../assets/HeroImages/day2.png";
import DayImg3 from "../../assets/HeroImages/day3.png";
import DayImg4 from "../../assets/HeroImages/day4.png";
import NightImg1 from "../../assets/HeroImages/night1.png";
import NightImg2 from "../../assets/HeroImages/night2.png";
import NightImg3 from "../../assets/HeroImages/night3.png";
import NightImg4 from "../../assets/HeroImages/night4.png";

function Hero({ isDarkMode }) {
  const navigate = useNavigate();

  const handleStartSearch = () => {
    navigate("/search");
  };
  const dayImages = [DayImg1, DayImg2, DayImg3, DayImg4];
  const nightImages = [NightImg1, NightImg2, NightImg3, NightImg4];
  const images = isDarkMode ? nightImages : dayImages;

  return (
    <section className="hero">
      <div className="overlay">
        <Container>
          <Row className="hero-content">
            <Col xs={12} md={6} lg={true} className="hero-text">
              <h1>Discover Your Perfect Sanctuary</h1>
              <p>Find the home that matches your dreams.</p>
            </Col>
            <Col xs={12} md={true} lg={8} className="hero-carousel">
              <Carousel
                className="carousel-fade"
                controls={false}
                touch={true}
                indicators={false}
                variant={isDarkMode ? "light" : "dark"}
              >
                {images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt={`Slide ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <Row className="search-bar" style={{ marginBottom: "60px" }}>
            <button className="start-search-btn" onClick={handleStartSearch}>
              Start Search
            </button>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Hero;
