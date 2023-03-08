import React, { memo } from "react";
import { Link } from "react-router-dom";
import { validDate } from "../../ulities/validDate";

const Comment = memo(({ comment, handleDeleteComment, author }) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link className="comment-author">
          <img
            src={comment.author.image}
            alt={comment.author.username}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link className="comment-author" to={`/${comment.author.username}`}>
          {comment.author.username}
        </Link>
        <span className="date-posted">{validDate(comment.createdAt)}</span>
        <span className="mod-options">
          <i className="ion-edit" />
          <i
            className="ion-trash-a"
            onClick={() => handleDeleteComment(comment.id)}
          />
        </span>
      </div>
    </div>
  );
});

export default Comment;
