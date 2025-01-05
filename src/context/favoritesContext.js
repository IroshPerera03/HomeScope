import React, { createContext, useState, useEffect } from "react";

// Create a context for favorites
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // State to hold the list of favorite properties
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initialization
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        console.log("No favorites found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      localStorage.removeItem("favorites"); // Clear corrupted data
    }
  }, []); // Runs only once on mount

  // Save favorites to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  // Function to add a property to favorites
  const addFavorite = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);
    }
  };

  // Function to remove a property from favorites by id
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  // Function to clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Provide the favorites state and functions to the component tree
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
