import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from "../utils/types";

export default function User(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;
    case USER_LOGGED_OUT:
      return {};
    case USER_SIGNED_UP:
      return action.payload;
    default:
      return state;
  }
}

export const userLoggedIn = res => ({
  type: USER_LOGGED_IN,
  payload: res
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const userSignUp = res => ({
  type: USER_SIGNED_UP,
  payload: res
});
