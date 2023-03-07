import React, { memo } from "react";

const InputContent = memo(({ content, handleInputContent }) => {
  return (
    <fieldset className="form-group">
      <textarea
        value={content}
        onChange={(e) => handleInputContent(e)}
        className="form-control"
        rows={8}
        placeholder="Write your article (in markdown)"
      />
    </fieldset>
  );
});

export default InputContent;
