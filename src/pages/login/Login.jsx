import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../ulities/callApi";
import { useAuthContext } from "../../store/contexts/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { handleSetDataLogin, state } = useAuthContext();
  const { user } = state;

  const error = {};

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setErrors({});
  };

  const handlePassWordInput = (e) => {
    setPassword(e.target.value);
    setErrors({});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      error.email = "email can't be blank";
    }
    if (password.trim() === "") {
      error.password = "password can't be blank";
    }
    const userLogin = {
      email: email,
      password: password,
    };
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    login({
      user: userLogin,
    })
      .then((userData) => {
        console.log(userData);
        handleSetDataLogin(userData.user);
      })
      .catch((err) =>
        setErrors({
          ...errors,
          message:
            Object.keys(err.response.data.errors) +
            " " +
            Object.values(err.response.data.errors),
        })
      );

    setEmail("");
    setPassword("");
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              <ul className="error-messages">
                {(errors.email && <li>{errors.email}</li>) ||
                  (errors.password && <li>{errors.password}</li>) ||
                  (errors.message && <li>{errors.message}</li>)}
              </ul>
              <form onSubmit={handleLogin}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailInput}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassWordInput}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
