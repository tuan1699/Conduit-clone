import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { initAuthState } from "../reducers/authReducer";
import {
  loginAction,
  logoutAction,
  loginSuccessfull,
  updateUser,
} from "../actions";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initAuthState);

  const handleSetDataLogin = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(loginAction(userData));
  };

  const handleSetLogout = () => {
    console.log("log out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutAction());
  };

  const handleUpdateUser = (userUpdated) => {
    console.log("update user");
    localStorage.setItem("user", JSON.stringify(userUpdated));
    dispatch(updateUser(userUpdated));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (user) {
      dispatch(loginSuccessfull(user));
    }
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ state, handleSetDataLogin, handleSetLogout, handleUpdateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
