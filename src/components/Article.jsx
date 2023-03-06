import React from "react";
import { Link } from "react-router-dom";
import { validDate } from "../ulities/validDate";
import Favourite from "./Favourite";

const Article = ({ article }) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/${article.author.username}`}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={`/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{validDate(article.createdAt)}</span>
        </div>
        <Favourite
          favoitesCount={article.favoritesCount}
          favorited={article.favorited}
          slug={article.slug}
          right="pull-xs-right"
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default Article;
