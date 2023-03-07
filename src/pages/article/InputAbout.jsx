import React, { memo } from "react";

const InputAbout = memo(({ about, handleInputAbout }) => {
  return (
    <fieldset className="form-group">
      {/* About article */}
      <input
        type="text"
        value={about}
        onChange={(e) => handleInputAbout(e)}
        className="form-control"
        placeholder="What's this article about?"
      />
    </fieldset>
  );
});

export default InputAbout;
