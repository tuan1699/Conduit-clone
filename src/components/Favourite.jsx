import React, { useEffect, useState } from "react";
import { addFavorite, unFavorite } from "../ulities/callApi";
import { useNavigate } from "react-router-dom";

const Favourite = ({
  favoitesCount,
  isFavorite,
  slug,
  title,
  right,
  handleFavorite,
}) => {
  // const [isFavorite, setIsFavorite] = useState(null);
  // const [countFavorite, setCountFavorite] = useState(null);

  // useEffect(() => {
  //   setIsFavorite(favorited);
  //   setCountFavorite(favoitesCount);
  // }, [favoitesCount, favorited]);

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
      <i className="ion-heart" /> ({favoitesCount})
    </button>
  );
};

export default Favourite;
