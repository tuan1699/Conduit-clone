import React from "react";
import Content from "./Content";

const Home = () => {
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <Content />
      </div>
    </>
  );
};

export default Home;
