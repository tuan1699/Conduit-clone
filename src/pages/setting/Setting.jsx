import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/contexts/authContext";
import { updateCurrentUser } from "../../ulities/callApi";
import InputBio from "./InputBio";
import InputEmail from "./InputEmail";
import InputImage from "./InputImage";
import InputNewPassword from "./InputNewPassword";
import InputUserName from "./InputUserName";

const Setting = () => {
  const { handleSetLogout, handleUpdateUser } = useAuthContext();
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

  const [imageURL, setImageURL] = useState(currentUser?.image);
  const [username, setUserName] = useState(currentUser?.username);
  const [bio, setBio] = useState(currentUser?.bio);
  const [email, setEmail] = useState(currentUser?.email);
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateSetting = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setUserName(currentUser.username);
    } else {
      const userUpdated = {
        email: email,
        password: newPassword,
        username: username,
        bio: bio,
        image: imageURL,
      };
      updateCurrentUser({
        user: userUpdated,
      })
        .then((data) => {
          handleUpdateUser(data.user);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="settings-page">
      {!currentUser && <Navigate to="/" replace={true} />}
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form>
              <fieldset>
                <InputImage imageURL={imageURL} setImageURL={setImageURL} />
                <InputUserName username={username} setUserName={setUserName} />
                <InputBio bio={bio} setBio={setBio} />
                <InputEmail email={email} setEmail={setEmail} />
                <InputNewPassword
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                />
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={handleUpdateSetting}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={handleSetLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
