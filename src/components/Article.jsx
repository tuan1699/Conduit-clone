import React from "react";
import { Link } from "react-router-dom";
import { validDate } from "../actions/validDate";

const Article = ({ article }) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to="">
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link className="author">{article.author.username}</Link>
          <span className="date">{validDate(article.createdAt)}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <Link to="" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default Article;
