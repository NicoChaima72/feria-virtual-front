import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import sessionReducer from "../features/sessionSlice";
import usersReducer from "../features/usersSlice";
import uiReducer from "../features/uiSlice";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  users: usersReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: reducers,
  // composeEnhancers(applyMiddleware(thunk))
  devTools: process.env.NODE_ENV !== "production",
});
