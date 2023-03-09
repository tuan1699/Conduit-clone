import React, { memo } from "react";
import { Link } from "react-router-dom";
import DeleteArticleBtn from "../../components/DeleteArticleBtn";
import EditArticleBtn from "../../components/EditArticleBtn";
import FavouriteDetailBtn from "../../components/FavouriteDetailBtn";
import FollowBtn from "../../components/FollowBtn";
import { validDate } from "../../ulities/validDate";

const Feature = memo(
  ({
    author,
    user,
    createdAt,
    slug,
    handleFavorite,
    follow,
    favourite,
    countFavorite,
    handleFollow,
  }) => {
    return (
      <div className="article-meta">
        <Link to={`/${author.username}`}>
          <img src={author.image} alt={author.username} />
        </Link>
        <div className="info">
          <Link className="author" to={`/${author.username}`}>
            {author.username}
          </Link>
          <span className="date">{validDate(createdAt)}</span>
        </div>
        {user && user?.username === author.username ? (
          <>
            <EditArticleBtn slug={slug} />
            &nbsp;&nbsp;
            <DeleteArticleBtn slug={slug} />
          </>
        ) : (
          <>
            <FollowBtn
              isFollowing={follow}
              username={author.username}
              handleFollow={handleFollow}
            />
            &nbsp;&nbsp;
            <FavouriteDetailBtn
              favoitesCount={countFavorite}
              isFavorite={favourite}
              handleFavorite={handleFavorite}
              slug={slug}
              title="Favorite Post"
            />
          </>
        )}
      </div>
    );
  }
);

export default Feature;
