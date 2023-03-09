import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../ulities/callApi";

const DeleteArticleBtn = ({ slug }) => {
  const navigate = useNavigate();
  const handleDeleteArticle = () => {
    deleteArticle(slug)
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => {
        if (window.confirm("Are you sure delete this article")) {
          handleDeleteArticle();
        }
      }}
    >
      <i className="ion-trash-a" /> Delete Article
    </button>
  );
};

export default DeleteArticleBtn;
