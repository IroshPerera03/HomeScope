import React from "react";
import "../header/header.css";
import Logo from "../../assets/HomeScope Logo_Logo - Light.png";

function Header({ toggleTheme }) {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo-image" src={Logo} alt="Home-Scope Logo" />
        <h1>Home-Scope</h1>
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="#">Buy</a>
        <a href="#">Rent</a>
        <a href="#">Contact</a>
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
