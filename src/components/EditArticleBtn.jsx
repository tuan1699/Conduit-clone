import React from "react";
import { useNavigate } from "react-router-dom";

const EditArticleBtn = ({ slug }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={() => {
        navigate(`/editor/${slug}`);
      }}
    >
      <i className="ion-edit" /> Edit Article
    </button>
  );
};

export default EditArticleBtn;
