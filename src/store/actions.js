import { LOGIN, LOGOUT, LOGIN_SUCCESS, UPDATE_USER } from "../ulities/constant";

export const loginAction = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const loginSuccessfull = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};
