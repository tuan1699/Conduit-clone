import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFollowUser, handleUnFollowUser } from "../ulities/callApi";

const FollowBtn = ({ isFollowing, username }) => {
  const [follow, setFollow] = useState(isFollowing);
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFollow = () => {
    if (follow) {
      handleUnFollowUser(username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    } else {
      handleFollowUser(username)
        .then(() => {
          setFollow(!follow);
        })
        .catch((err) => {
          console.log(err);
          setFollow(follow);
        });
    }
  };

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={() => {
        if (user) {
          handleFollow();
        } else {
          navigate("/login");
        }
      }}
    >
      <i className="ion-plus-round" />
      &nbsp; {follow ? "Unfollowing" : "Following"} {username}
    </button>
  );
};

export default FollowBtn;
