import api from "../api";
import { userLoggedIn, userLoggedOut, userSignUp } from "../Redux-reducers/User";

export const login = credentials => dispatch => {
  return api.user.login(credentials).then(res => {
    dispatch(userLoggedIn(res));
  });
};

export const register = data => dispatch => {
  return api.user.register(data).then(res => {
    dispatch(userSignUp(res));
  });
};

export const logout = () => dispatch => {
  return api.user.logout().then(res => {
    dispatch(userLoggedOut());
  });
};
