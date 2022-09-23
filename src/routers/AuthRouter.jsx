import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/auth/LoginPage";

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
