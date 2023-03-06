import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchArticle,
  fetchArticleByTag,
  fetchFeed,
  fetchTags,
} from "../../ulities/callApi";
import Article from "../../components/Article";
import { PAGE_SIZE } from "../../ulities/constant";
import { useAuthContext } from "../../store/contexts/authContext";
import Tag from "./Tag";

const Content = () => {
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [currentTab, setCurrentTab] = useState("global-feed");
  const [tags, setTags] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");
  const { state } = useAuthContext();
  const { isAuthenticated } = state;

  const handleSelectTag = (tagActive) => {
    setCurrentPage(0);
    setCurrentTab("");
    setSelectedTag(tagActive);
  };

  useEffect(() => {
    if (currentTab === "your-feed") {
      fetchFeed({
        limit: 20,
        offset: 0,
      })
        .then((data) => {
          const dataSize = data.articles.length;
          const totalPage = Math.ceil(dataSize / PAGE_SIZE);
          const articlesInPage = data.articles.slice(
            currentPage * PAGE_SIZE,
            (currentPage + 1) * PAGE_SIZE
          );
          setArticles(articlesInPage);
          setTotalPage(totalPage);
        })
        .catch((err) => console.log(err));
    } else if (selectedTag !== "") {
      fetchArticleByTag({
        tag: selectedTag,
        limit: 20,
        offset: 0,
      })
        .then((data) => {
          const dataSize = data.articles.length;
          const totalPage = Math.ceil(dataSize / PAGE_SIZE);
          const articlesInPage = data.articles.slice(
            currentPage * PAGE_SIZE,
            (currentPage + 1) * PAGE_SIZE
          );
          setArticles(articlesInPage);
          setTotalPage(totalPage);
        })
        .catch((err) => console.log(err));
    } else {
      fetchArticle().then((data) => {
        const dataSize = data.articles.length;
        const totalPage = Math.ceil(dataSize / PAGE_SIZE);
        const articlesInPage = data.articles.slice(
          currentPage * PAGE_SIZE,
          (currentPage + 1) * PAGE_SIZE
        );
        setArticles(articlesInPage);
        setTotalPage(totalPage);
      });
    }
  }, [currentPage, currentTab, isAuthenticated, selectedTag]);

  useEffect(() => {
    fetchTags()
      .then((data) => {
        setTags(data.tags);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-9">
          <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link
                    to="#"
                    className={
                      currentTab === "your-feed"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      setCurrentPage(0);
                      setCurrentTab("your-feed");
                      setSelectedTag("");
                    }}
                  >
                    Your Feed
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item">
                <Link
                  to="#"
                  className={
                    currentTab === "global-feed"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => {
                    setCurrentPage(0);
                    setSelectedTag("");
                    setCurrentTab("global-feed");
                  }}
                >
                  Global Feed
                </Link>
              </li>
              {selectedTag !== "" ? (
                <li className="nav-item">
                  <Link to="#" className={"nav-link active"}>
                    <i className="ion-pound"></i> {selectedTag}
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          {articles && articles.length === 0 ? (
            <div className="article-preview">No articles are here ... yet</div>
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
          <ul className="pagination">
            {totalPage &&
              new Array(totalPage).fill(null).map((num, index) => (
                <li
                  className={
                    currentPage === index
                      ? "page-item ng-scope active"
                      : "page-item ng-scope"
                  }
                  style={{
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => setCurrentPage(index)}
                >
                  <div className="page-link ng-binding">{index + 1}</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-3">
          <div className="sidebar">
            <p>Popular Tags</p>
            <div className="tag-list">
              {tags === null ? (
                <div className="article-preview">Loading...</div>
              ) : tags.length !== 0 ? (
                tags.map((tagname, index) => (
                  <Tag
                    tagname={tagname}
                    key={index}
                    handleSelectTag={handleSelectTag}
                  />
                ))
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
