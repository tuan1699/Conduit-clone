import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchDetail } from "../../ulities/callApi";
import { validDate } from "../../ulities/validDate";

const DetailArticle = () => {
  const [detailData, setDetailData] = useState(null);
  const location = useLocation();
  const slug = location.pathname.slice(9);

  useEffect(() => {
    fetchDetail(slug)
      .then((data) => {
        console.log(data.article);
        setDetailData(data.article);
      })
      .catch((err) => console.log(err));
  }, []);

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
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {detailData.author.username}{" "}
                  <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart" />
                  &nbsp; Favorite Post{" "}
                  <span className="counter">({detailData.favoritesCount})</span>
                </button>
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
                  <a href className="author">
                    {detailData.author.username}
                  </a>
                  <span className="date">
                    {validDate(detailData.createdAt)}
                  </span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {detailData.author.username}{" "}
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart" />
                  &nbsp; Favorite Post{" "}
                  <span className="counter">({detailData.favoritesCount})</span>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                      defaultValue={""}
                    />
                  </div>
                  <div className="card-footer">
                    <img
                      src={detailData.author.image}
                      alt={detailData.author.username}
                    />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comment Component */}
                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link href className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </Link>
                    &nbsp;
                    <Link href className="comment-author">
                      Jacob Schmidt
                    </Link>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit" />
                      <i className="ion-trash-a" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailArticle;
