import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard({ beLoggedIn }) {
  const { user } = useSelector((state) => state.auth);

  return !!beLoggedIn && !!user ? (
    <Outlet></Outlet>
  ) : !beLoggedIn && !user ? (
    <Outlet></Outlet>
  ) : !!beLoggedIn ? (
    <Navigate replace to="/auth/login" />
  ) : (
    <Navigate replace to="/" />
  );
}


// AuthGuard.propTypes = {
//   beLoggedIn: PropTypes.bool,
// }

export default AuthGuard;
