import { combineReducers } from "redux";
import { USER_LOGGED_OUT } from "../utils/types";
import Images from "./Images";
import User from "./User";
const appReducer = combineReducers({
  User,
  Images
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
