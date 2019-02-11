import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../Redux-reducers";

let Middleware = null;
if (process.env.NODE_ENV === "development") Middleware = composeWithDevTools(applyMiddleware(thunk));
else Middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, Middleware);
