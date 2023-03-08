import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Article from "../../components/Article";
import FollowBtn from "../../components/FollowBtn";
import { useAuthContext } from "../../store/contexts/authContext";
import {
  getProfileAuthor,
  fetchArticleByUser,
  fetchFavArticleByUser,
} from "../../ulities/callApi";

const ProfileOther = () => {
  const { profile } = useParams();
  const [author, setAuthor] = useState(null);
  const [articles, setArticles] = useState(null);
  const [currentTab, setCurrentTab] = useState("my-article");

  const { state } = useAuthContext();
  const { user } = state;

  useEffect(() => {
    if (currentTab === "my-article") {
      getProfileAuthor(profile)
        .then((data) => {
          setAuthor(data.profile);
          const userAPI = data.profile.username.replaceAll(" ", "+");
          fetchArticleByUser({
            author: userAPI,
          })
            .then((data) => {
              setArticles(data.articles);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (currentTab === "favorited-article") {
      getProfileAuthor(profile)
        .then((data) => {
          setAuthor(data.profile);
          console.log(data.profile);
          const userAPI = data.profile.username.replaceAll(" ", "+");
          fetchFavArticleByUser({
            author: userAPI,
          })
            .then((data) => {
              setArticles(data.articles);
              console.log(data.articles);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [currentTab]);

  return (
    <>
      {author && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={author.image} className="user-img" />
                  <h4>{author.username}</h4>
                  <p>{author.bio}</p>
                  {user && user?.username === author.username ? (
                    <Link
                      to="/settings"
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-plus-round" />
                      &nbsp; Edit Profile Settings
                    </Link>
                  ) : (
                    <FollowBtn
                      isFollowing={author.following}
                      username={author.username}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        to="#"
                        className={
                          currentTab === "my-article"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => {
                          setCurrentTab("my-article");
                        }}
                      >
                        My Articles
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#"
                        className={
                          currentTab === "favorited-article"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => {
                          setCurrentTab("favorited-article");
                        }}
                      >
                        Favorited Articles
                      </Link>
                    </li>
                  </ul>
                </div>
                {articles && articles.length === 0 ? (
                  <div className="article-preview">
                    No articles are here ... yet
                  </div>
                ) : articles === null ? (
                  <div className="article-preview">Loading...</div>
                ) : (
                  <div className="">
                    {articles &&
                      articles.map((article, index) => (
                        <Article article={article} key={index} />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileOther;
