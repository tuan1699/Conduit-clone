import React, { useEffect, useState } from "react";
import { addFavorite, unFavorite } from "../ulities/callApi";

const Favourite = ({ favoitesCount, favorited, slug, title, right }) => {
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [countFavorite, setCountFavorite] = useState(favoitesCount);

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
          ? `btn btn-sm btn-primary btn-sm ${right}`
          : `btn btn-outline-primary btn-sm ${right}`
      }
      onClick={handleFavorite}
    >
      <i className="ion-heart" /> {title} ({countFavorite})
    </button>
  );
};

export default Favourite;
