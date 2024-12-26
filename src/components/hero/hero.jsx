import React from "react";
import SearchBar from "../searchBar/searchBar";
import { Carousel } from "react-bootstrap";
import "./hero.css";

import DayImg1 from "../../assets/HeroImages/day1.png";
import DayImg2 from "../../assets/HeroImages/day2.png";
import DayImg3 from "../../assets/HeroImages/day3.png";
import DayImg4 from "../../assets/HeroImages/day4.png";
import NightImg1 from "../../assets/HeroImages/night1.png";
import NightImg2 from "../../assets/HeroImages/night2.png";
import NightImg3 from "../../assets/HeroImages/night3.png";
import NightImg4 from "../../assets/HeroImages/night4.png";

function Hero({ isDarkMode }) {
  const dayImages = [DayImg1, DayImg2, DayImg3, DayImg4];
  const nightImages = [NightImg1, NightImg2, NightImg3, NightImg4];
  const images = isDarkMode ? nightImages : dayImages;

  return (
    <section className="hero">
      <div className="overlay">
        <div className="hero-content">
          <div className="hero-text">
            <h1>believe in finding it</h1>
            <p>with the UK's largest choice of homes</p>
          </div>
          <div className="hero-carousel">
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
          </div>
        </div>
        <div className="search-bar">
          <SearchBar /> {/* Updated component */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
