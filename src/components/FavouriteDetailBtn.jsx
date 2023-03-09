import React from "react";
import { useNavigate } from "react-router-dom";

const FavouriteDetailBtn = ({
  favoitesCount,
  isFavorite,
  right,
  handleFavorite,
}) => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <button
      className={
        isFavorite
          ? `btn btn-primary btn-sm ${right}`
          : `btn btn-outline-primary btn-sm ${right}`
      }
      onClick={() => {
        if (user) {
          handleFavorite();
        } else {
          navigate("/login");
        }
      }}
    >
      <i className="ion-heart" /> Favourite Article ({favoitesCount})
    </button>
  );
};

export default FavouriteDetailBtn;
