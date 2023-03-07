import React from "react";

const Tag = ({ tag }) => {
  return (
    <span className="tag-default tag-pill ng-binding ng-scope">
      <i className="ion-close-round" />
      {tag}
    </span>
  );
};

export default Tag;
