import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticle } from "../../ulities/callApi";
import Article from "../../components/Article";
import { PAGE_SIZE } from "../../ulities/constant";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
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
  }, [currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">Global Feed</a>
                </li>
              </ul>
            </div>
            <div className="">
              {articles &&
                articles.map((article, index) => (
                  <Article article={article} key={index} />
                ))}
            </div>
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
                <Link to="" className="tag-pill tag-default">
                  programming
                </Link>
                <Link to="" className="tag-pill tag-default">
                  javascript
                </Link>
                <Link to="" className="tag-pill tag-default">
                  emberjs
                </Link>
                <Link to="" className="tag-pill tag-default">
                  angularjs
                </Link>
                <Link to="" className="tag-pill tag-default">
                  react
                </Link>
                <Link to="" className="tag-pill tag-default">
                  mean
                </Link>
                <Link to="" className="tag-pill tag-default">
                  node
                </Link>
                <Link to="" className="tag-pill tag-default">
                  rails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
