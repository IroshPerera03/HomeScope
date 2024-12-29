import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoLight from "../../assets/Logos/HomeScope Logo_Logo - Light.png";
import LogoDark from "../../assets/Logos/HomeScope Logo_Logo -Dark.png";
import "../header/header.css";

function Header({ toggleTheme, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img
          className="logo-image"
          src={isDarkMode ? LogoDark : LogoLight}
          alt="Home-Scope Logo"
        />
        <h1>HomeScope</h1>
      </div>
      <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Search
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </nav>
      <div className="header-actions">
        <button className="dark-mode-switch" onClick={toggleTheme}>
          Dark Mode
        </button>
        <button className="sign-up">Sign Up</button>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
