import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import InputUserName from "../../components/InputUserName";
import { useAuthContext } from "../../store/contexts/authContext";
import { register } from "../../ulities/callApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const { handleSetDataLogin } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    if (userName.trim() === "") {
      setErrors("username can't be blank");
    }
    if (email.trim() === "") {
      setErrors("email can't be blank");
    }
    if (password.trim() === "") {
      setErrors("password can't be blank");
    }
    const userRegister = {
      username: userName,
      email: email,
      password: password,
    };
    register({
      user: userRegister,
    })
      .then((data) => {
        console.log(data.user);
        handleSetDataLogin(data.user);
        setErrors(null);
        setEmail("");
        setPassword("");
        setUserName("");
        navigate(`/`);
      })
      .catch((err) => {
        setErrors(
          Object.keys(err.response.data.errors) +
            " " +
            Object.values(err.response.data.errors)
        );
      });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>
            <ul className="error-messages">{errors && <li>{errors}</li>}</ul>

            <form>
              <InputUserName
                userName={userName}
                setUserName={setUserName}
                setErrors={setErrors}
              />
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
                onClick={handleRegister}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
