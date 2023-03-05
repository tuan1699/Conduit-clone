import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <Link
              className={currentRoute === "/" ? "nav-link active" : "nav-link"}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                currentRoute === "/editor" ? "nav-link active" : "nav-link"
              }
              to="/editor"
            >
              {" "}
              <i className="ion-compose" />
              &nbsp;New Article{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                currentRoute === "/settings" ? "nav-link active" : "nav-link"
              }
              to="/settings"
            >
              {" "}
              <i className="ion-gear-a" />
              &nbsp;Settings{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                currentRoute === "/login" ? "nav-link active" : "nav-link"
              }
              to="/login"
            >
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                currentRoute === "/register" ? "nav-link active" : "nav-link"
              }
              to="/register"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
