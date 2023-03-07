import React, { memo } from "react";

const InputEmail = memo(({ email, setEmail }) => {
  return (
    <fieldset className="form-group">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control form-control-lg"
        placeholder="Email"
        type="email"
      />
    </fieldset>
  );
});

export default InputEmail;
