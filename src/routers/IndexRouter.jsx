import React, { Suspense, useEffect, useState, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth, onLogin } from "../features/authSlice";
import { onClearSession, onSetSession } from "../features/sessionSlice";
import {
  changeStateSession,
  clearSessionMessage,
  getSessionStorage,
  hasSessionStorage,
} from "../utils/session";
import AuthGuard from "../guards/AuthGuard";
import Layout from "../pages/layouts/Layout";
import { navigateByRole } from "../utils/utils";
import { AnimatePresence } from "framer-motion";
import LoadingIndex from "../components/LoadingIndex";
import ProducerRouter from "./ProducerRouter";
import TransportistRouter from "./TransportistRouter";

const AuthRouter = lazy(() => import("./AuthRouter"));
const AdminRouter = lazy(() => import("./AdminRouter"));
const LocalRouter = lazy(() => import("./LocalRouter"));

const IndexRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth(null));
    if (user?.id) {
      dispatch(onLogin(user));
    }
  }, []);

  useEffect(() => {
    if (hasSessionStorage()) {
      const session = getSessionStorage();
      if (session.state === 0) {
        dispatch(onSetSession(session));
        changeStateSession(session.state + 1);
      } else {
        dispatch(onClearSession());
        clearSessionMessage();
      }
      return () => {
        dispatch(onClearSession());
        clearSessionMessage();
      };
    }
  }, [location.pathname]);

  if (loading) return <LoadingIndex></LoadingIndex>;

  return (
    <AnimatePresence>
      <Suspense fallback={<LoadingIndex></LoadingIndex>}>
        <Routes>
          <Route
            path="/auth"
            element={<AuthGuard beLoggedIn={false}></AuthGuard>}
          >
            <Route path="*" element={<AuthRouter></AuthRouter>}></Route>
          </Route>
          <Route path="/" element={<AuthGuard beLoggedIn={true}></AuthGuard>}>
            <Route
              path="/"
              exact
              element={
                <Navigate to={navigateByRole(user?.role_id)} replace></Navigate>
              }
            ></Route>
            <Route element={<Layout></Layout>}>
              <Route
                path="admin/*"
                element={<AdminRouter></AdminRouter>}
              ></Route>
              <Route
                path="local/*"
                element={<LocalRouter></LocalRouter>}
              ></Route>
              <Route path="external/*" element={<></>}></Route>
              <Route path="producer/*" element={<ProducerRouter></ProducerRouter>}></Route>
              <Route path="transportist/*" element={<TransportistRouter></TransportistRouter>}></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default IndexRouter;
