import React from "react";

const Tag = ({ tag, handleDeleteTag, position }) => {
  return (
    <span className="tag-default tag-pill ng-binding ng-scope">
      <i className="ion-close-round" onClick={() => handleDeleteTag(tag)} />
      {tag}
    </span>
  );
};

export default Tag;
