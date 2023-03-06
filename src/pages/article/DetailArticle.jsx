import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  fetchComments,
  fetchDetail,
  postComment,
  deleteComment,
} from "../../ulities/callApi";
import { validDate } from "../../ulities/validDate";
import FollowBtn from "../../components/FollowBtn";
import Favourite from "../../components/Favourite";
import InputComment from "./InputComment";
import Comment from "./Comment";

const DetailArticle = () => {
  const [detailData, setDetailData] = useState(null);
  const [comments, setComments] = useState(null);
  const location = useLocation();
  const slug = location.pathname.slice(9);

  useEffect(() => {
    fetchDetail(slug)
      .then((data) => {
        setDetailData(data.article);
        fetchComments(slug).then((dataComment) => {
          setComments(dataComment.comments);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleComment = (newComment) => {
    postComment(slug, {
      comment: {
        body: newComment,
      },
    })
      .then((data) => {
        console.log(data);
        const newComments = [...comments, data.comment];
        setComments(newComments);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComment = (id) => {
    deleteComment(slug, id)
      .then(() => {
        const indexComment = comments.findIndex((comment) => comment.id === id);
        const newComments = [...comments];
        newComments.splice(indexComment, 1);
        setComments(newComments);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {detailData && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{detailData.title}</h1>
              <div className="article-meta">
                <Link href>
                  <img
                    src={detailData.author.image}
                    alt={detailData.author.username}
                  />
                </Link>
                <div className="info">
                  <Link href className="author">
                    {detailData.author.username}
                  </Link>
                  <span className="date">
                    {validDate(detailData.createdAt)}
                  </span>
                </div>
                <FollowBtn
                  isFollowing={detailData.author.following}
                  username={detailData.author.username}
                />
                &nbsp;&nbsp;
                <Favourite
                  favoitesCount={detailData.favoritesCount}
                  favorited={detailData.favorited}
                  slug={detailData.slug}
                  title="Favorite Post"
                />
              </div>
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
              <div className="article-meta">
                <Link href="profile.html">
                  <img
                    src={detailData.author.image}
                    alt={detailData.author.username}
                  />
                </Link>
                <div className="info">
                  <Link className="author">{detailData.author.username}</Link>
                  <span className="date">
                    {validDate(detailData.createdAt)}
                  </span>
                </div>
                <FollowBtn
                  isFollowing={detailData.author.following}
                  username={detailData.author.username}
                />
                &nbsp;&nbsp;
                <Favourite
                  favoitesCount={detailData.favoritesCount}
                  favorited={detailData.favorited}
                  slug={detailData.slug}
                  title="Favorite Post"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <InputComment
                  imageUser={detailData.author.image}
                  username={detailData.author.username}
                  handleComment={handleComment}
                />

                {/* Comment Component */}
                {comments &&
                  comments.map((comment, index) => (
                    <Comment
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
