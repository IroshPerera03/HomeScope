import React from "react";
import LogoLight from "../../assets/Logos/HomeScope Logo_Logo - Light.png";
import LogoDark from "../../assets/Logos/HomeScope Logo_Logo -Dark.png";
import "../header/header.css";

function Header({ toggleTheme }, { isDarkMode }) {
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
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/search">Search</a>
        <a href="/about">About</a>
      </nav>
      <div className="header-actions">
        <button className="dark-mode-switch" onClick={toggleTheme}>
          Dark Mode
        </button>
        <button className="sign-up">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
