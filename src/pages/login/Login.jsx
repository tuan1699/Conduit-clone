import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../ulities/callApi";
import { useAuthContext } from "../../store/contexts/authContext";
import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { handleSetDataLogin, state } = useAuthContext();
  const { user } = state;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setErrors("email can't be blank");
    }
    if (password.trim() === "") {
      setErrors("password can't be blank");
    }
    const userLogin = {
      email: email,
      password: password,
    };
    login({
      user: userLogin,
    }).then((data) => {
      if (data.errors) {
        setErrors(
          Object.keys(data.errors).toString() +
            " " +
            Object.values(data.errors).toString()
        );
      } else {
        console.log(data);
        handleSetDataLogin(data.user);
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setErrors(null);
        setEmail("");
        setPassword("");
      }
    });
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
              <ul className="error-messages">{errors && <li>{errors}</li>}</ul>
              <form onSubmit={handleLogin}>
                <InputEmail
                  email={email}
                  setEmail={setEmail}
                  setErrors={setErrors}
                />
                <InputPassword
                  password={password}
                  setPassword={setPassword}
                  setErrors={setErrors}
                />

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
