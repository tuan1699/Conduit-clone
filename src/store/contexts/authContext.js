import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { initAuthState } from "../reducers/authReducer";
import { loginAction, logoutAction, loginSuccessfull } from "../actions";

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (user) {
      dispatch(loginSuccessfull(user));
    }
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ state, handleSetDataLogin, handleSetLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
