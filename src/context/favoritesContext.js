import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
