import React from "react";
import { Link } from "react-router-dom";

const Tag = ({ tagname, handleSelectTag }) => {
  return (
    <Link
      to=""
      className="tag-pill tag-default"
      onClick={() => handleSelectTag(tagname)}
    >
      {tagname}
    </Link>
  );
};

export default Tag;
