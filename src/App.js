import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Search from "./components/search/search";
import PropertyDetails from "./components/propertyDetails/propertyDetails";
import { FavoritesProvider } from "./context/favoritesContext";
import "react-widgets/styles.css";
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <FavoritesProvider>
      <Router basename="/HomeScope">
        <div className="app-container">
          <div className={isDarkMode ? "App dark-mode" : "App"}>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Hero isDarkMode={isDarkMode} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
