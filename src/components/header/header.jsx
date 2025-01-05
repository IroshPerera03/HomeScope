import React, { useState } from "react"; // Importing React and useState hook
import { NavLink } from "react-router-dom"; // Importing NavLink for navigation
import LogoLight from "../../assets/Logos/HomeScope Logo_Logo - Light.png"; // Importing light mode logo
import LogoDark from "../../assets/Logos/HomeScope Logo_Logo -Dark.png"; // Importing dark mode logo
import "../header/header.css"; // Importing CSS for header

function Header({ toggleTheme, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink
          to="
        /home"
        >
          <img
            className="logo-image"
            src={isDarkMode ? LogoDark : LogoLight} // Conditional rendering of logo based on theme
            alt="Home-Scope Logo"
          />
          <h1>HomeScope</h1>
        </NavLink>
      </div>
      <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        {" "}
        {/* Conditional class for mobile menu */}
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")} // Active class for current route
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")} // Active class for current route
        >
          Search
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")} // Active class for current route
        >
          About
        </NavLink>
      </nav>
      <div className="header-actions">
        <button className="dark-mode-switch" onClick={toggleTheme}>
          {" "}
          {/* Button to toggle dark mode */}
          Dark Mode
        </button>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          {" "}
          {/* Button to toggle mobile menu */}☰
        </button>
      </div>
    </header>
  );
}

export default Header; // Exporting Header component
