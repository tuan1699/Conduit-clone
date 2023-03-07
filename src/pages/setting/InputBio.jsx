import React, { memo } from "react";

const InputBio = memo(({ bio, setBio }) => {
  return (
    <fieldset className="form-group">
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="form-control form-control-lg"
        rows={8}
        placeholder="Short bio about you"
      />
    </fieldset>
  );
});

export default InputBio;
