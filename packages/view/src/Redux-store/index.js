import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../Redux-reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["Images"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let Middleware = null;
if (process.env.NODE_ENV === "development") Middleware = composeWithDevTools(applyMiddleware(thunk));
else Middleware = applyMiddleware(thunk);

const store = createStore(persistedReducer, Middleware);
const persistor = persistStore(store);

export { store, persistor };
