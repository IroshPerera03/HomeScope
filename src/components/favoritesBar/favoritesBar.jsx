import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../context/favoritesContext.js";
import "./favoritesBar.css";

const FavoritesBar = () => {
  const { favorites, removeFavorite, clearFavorites } =
    useContext(FavoritesContext);

  return (
    <div className="favorites-bar">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((property) => {
            const imagePath = require(`../../assets/PropertyImages/${property.id}/${property.picture}`);
            console.log(imagePath);
            return (
              <li key={property.id} className="favorite-item">
                <Link to={`/property/${property.id}`}>
                  <img src={imagePath} alt={property.name} />
                  <div>
                    <p>{property.name}</p>
                    <p>{property.location}</p>
                  </div>
                </Link>
                <button onClick={() => removeFavorite(property.id)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {favorites.length > 0 && (
        <button className="clear-button" onClick={clearFavorites}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default FavoritesBar;
