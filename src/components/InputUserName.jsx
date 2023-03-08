import React, { memo } from "react";

const InputUserName = memo(({ username, setUserName, setErrors }) => {
  return (
    <fieldset className="form-group">
      <input
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
          setErrors(null);
        }}
        className="form-control form-control-lg"
        type="text"
        placeholder="Your Name"
      />
    </fieldset>
  );
});

export default InputUserName;
