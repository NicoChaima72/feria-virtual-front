import React, { lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

const Login = lazy(() => import("../pages/auth/LoginPage"))

const AuthRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthRouter;
