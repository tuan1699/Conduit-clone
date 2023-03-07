import React, { memo } from "react";

const InputTag = memo(({ inputTag, setInputTag, handleAddTag }) => {
  return (
    <input
      value={inputTag}
      onChange={(e) => setInputTag(e.target.value)}
      type="text"
      className="form-control"
      placeholder="Enter tags"
      onKeyDown={handleAddTag}
    />
  );
});

export default InputTag;
