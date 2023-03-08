import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  fetchComments,
  fetchDetail,
  postComment,
  deleteComment,
  handleUnFollowUser,
  handleFollowUser,
  addFavorite,
  unFavorite,
} from "../../ulities/callApi";

import InputComment from "./InputComment";
import Comment from "./Comment";
import { useAuthContext } from "../../store/contexts/authContext";
import Feature from "./Feature";

const DetailArticle = () => {
  const [detailData, setDetailData] = useState(null);
  const [comments, setComments] = useState(null);
  const location = useLocation();
  const slug = location.pathname.slice(9);
  const { state } = useAuthContext();
  const { user } = state;

  const [follow, setFollow] = useState();
  const [favourite, setFavourite] = useState();
  const [countFavorite, setCountFavorite] = useState();

  useEffect(() => {
    fetchDetail(slug)
      .then((data) => {
        setDetailData(data.article);
        setFollow(data.article.author.following);
        setFavourite(data.article.favorited);
        setCountFavorite(data.article.favoritesCount);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchComments(slug)
      .then((dataComment) => {
        setComments(dataComment.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleComment = useCallback(
    (newComment) => {
      if (newComment.trim() !== "") {
        postComment(slug, {
          comment: {
            body: newComment,
          },
        })
          .then((data) => {
            const newComments = [...comments, data.comment];
            setComments(newComments);
          })
          .catch((err) => console.log(err));
      }
    },
    [comments]
  );

  const handleDeleteComment = useCallback(
    (id) => {
      deleteComment(slug, id)
        .then(() => {
          const indexComment = comments.findIndex(
            (comment) => comment.id === id
          );
          const newComments = [...comments];
          newComments.splice(indexComment, 1);
          setComments(newComments);
        })
        .catch((err) => console.log(err));
    },
    [comments]
  );

  const handleFollow = () => {
    if (follow) {
      handleUnFollowUser(detailData.author.username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    } else {
      handleFollowUser(detailData.author.username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    }
  };

  const handleFavorite = () => {
    if (!favourite) {
      addFavorite(slug)
        .then(() => {
          setFavourite(true);
          setCountFavorite((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
          setFavourite(false);
        });
    } else {
      unFavorite(slug)
        .then(() => {
          setFavourite(false);
          setCountFavorite((prev) => prev - 1);
        })
        .catch((err) => {
          console.log(err);
          setFavourite(true);
        });
      setFavourite(!favourite);
    }
  };

  return (
    <>
      {detailData && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{detailData.title}</h1>
              <Feature
                author={detailData.author}
                createdAt={detailData.createdAt}
                slug={slug}
                user={user}
                favoritesCount={detailData.favoritesCount}
                follow={follow}
                favourite={favourite}
                countFavorite={countFavorite}
                handleFollow={handleFollow}
                handleFavorite={handleFavorite}
              />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{detailData.body}</p>
              </div>
            </div>
            <hr />
            <div className="article-actions">
              <Feature
                author={detailData.author}
                createdAt={detailData.createdAt}
                slug={slug}
                user={user}
                favoritesCount={detailData.favoritesCount}
                follow={follow}
                favourite={favourite}
                countFavorite={countFavorite}
                handleFollow={handleFollow}
                handleFavorite={handleFavorite}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {user ? (
                  <InputComment
                    imageUser={detailData.author.image}
                    username={detailData.author.username}
                    handleComment={handleComment}
                  />
                ) : (
                  <p>
                    <Link to="/login">Sign in</Link> or{" "}
                    <Link to="/register">Sign up</Link> to add comments on this
                    article.
                  </p>
                )}

                {/* Comment Component */}
                {comments &&
                  comments.map((comment, index) => (
                    <Comment
                      author={detailData.author.username}
                      comment={comment}
                      key={index}
                      handleDeleteComment={handleDeleteComment}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailArticle;
