import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import "./App.css";
import Search from "./components/search/search";
import PropertyDetails from "./components/propertyDetails/propertyDetails";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className={isDarkMode ? "App dark-mode" : "App"}>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/home" element={<Hero isDarkMode={isDarkMode} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
