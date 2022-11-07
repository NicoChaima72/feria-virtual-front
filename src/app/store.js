import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import sessionReducer from "../features/sessionSlice";
import usersReducer from "../features/usersSlice";
import uiReducer from "../features/uiSlice";
import salesReducer from "../features/salesSlice";
import fruitsVegetablesReducer from "../features/fruitsVegetablesSlice";

const reducers = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  users: usersReducer,
  fruitsVegetables: fruitsVegetablesReducer,
  ui: uiReducer,
  sales: salesReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});
