import React, { memo } from "react";

const InputPassword = memo(({ password, setPassword, setErrors }) => {
  return (
    <fieldset className="form-group">
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors(null);
        }}
        className="form-control form-control-lg"
        type="password"
        placeholder="New Password"
      />
    </fieldset>
  );
});

export default InputPassword;
