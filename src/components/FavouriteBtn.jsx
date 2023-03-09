import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite, unFavorite } from "../ulities/callApi";

const FavouriteBtn = ({ favoitesCount, favorited, slug, title, right }) => {
  const [isFavorite, setIsFavorite] = useState(null);
  const [countFavorite, setCountFavorite] = useState(null);
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorited);
    setCountFavorite(favoitesCount);
  }, [favoitesCount, favorited]);

  const handleFavorite = () => {
    if (!isFavorite) {
      addFavorite(slug)
        .then(() => {
          setIsFavorite(true);
          setCountFavorite((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(false);
        });
    } else {
      unFavorite(slug)
        .then(() => {
          setIsFavorite(false);
          setCountFavorite((prev) => prev - 1);
        })
        .catch((err) => {
          console.log(err);
          setIsFavorite(true);
        });
      setIsFavorite(!isFavorite);
    }
  };

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
      <i className="ion-heart" /> ({countFavorite})
    </button>
  );
};

export default FavouriteBtn;
