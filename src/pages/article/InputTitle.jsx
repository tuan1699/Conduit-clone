import React, { memo, useState } from "react";

const InputTitle = memo(function InputTitle({ title, handleInputTitle }) {
  return (
    <fieldset className="form-group">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Article Title"
        value={title}
        autoFocus
        onChange={(e) => {
          handleInputTitle(e);
        }}
      />
    </fieldset>
  );
});

export default InputTitle;
