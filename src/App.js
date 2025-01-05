import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import "./App.css";
import Search from "./components/search/search";
import PropertyDetails from "./components/propertyDetails/propertyDetails";
import "react-widgets/styles.css";
import { FavoritesProvider } from "./context/favoritesContext";

const App = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // Provide favorites context to the app
    <FavoritesProvider>
      <Router>
        <div className="app-container">
          <div className={isDarkMode ? "App dark-mode" : "App"}>
            {/* Header component with theme toggle */}
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Routes>
              {/* Route for home page */}
              <Route path="/home" element={<Hero isDarkMode={isDarkMode} />} />
              {/* Route for search page */}
              <Route path="/search" element={<Search />} />
              {/* Route for property details page */}
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/about" element={<About />} />
            </Routes>
            {/* Footer component */}
            <Footer />
          </div>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
