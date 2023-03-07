import React, { memo } from "react";

const InputNewPassword = memo(({ newPassword, setNewPassword }) => {
  return (
    <fieldset className="form-group">
      <input
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="form-control form-control-lg"
        type="password"
        placeholder="New Password"
      />
    </fieldset>
  );
});

export default InputNewPassword;
