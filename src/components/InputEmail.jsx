import React, { memo } from "react";

const InputEmail = memo(({ email, setEmail, setErrors }) => {
  return (
    <fieldset className="form-group">
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors(null);
        }}
        className="form-control form-control-lg"
        placeholder="Email"
        type="email"
      />
    </fieldset>
  );
});

export default InputEmail;
