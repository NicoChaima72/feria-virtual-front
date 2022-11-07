import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { onToggleSidebar } from "../../features/UISlice";
import useWindowSize from "../../hooks/useWindowsSize";

function Layout() {
  const { showSidebar, showConfirmLogout } = useSelector((state) => state.ui);
  const { message: messageSession, type: typeSession } = useSelector(
    (state) => state.session
  );
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();

  return (
    <div className="flex w-full relative">
      <Sidebar></Sidebar>
      <div
        className={`${
          (showSidebar && width <= 1000) || showConfirmLogout
            ? "overflow-y-hidden"
            : ""
        } flex-1 w-56 h-screen`}
      >
        {showSidebar && width <= 1000 && (
          <div
            onClick={() => dispatch(onToggleSidebar())}
            className="absolute w-full h-10 z-10"
            style={{
              backgroundColor: "rgba(0,0,0, .3)",
              minHeight: "-webkit-fill-available",
            }}
          ></div>
        )}
        <Navbar></Navbar>
        <div className="py-6 px-2 md:px-6 text-gray-800">
          {messageSession && (
            <div className="mb-4">
              <AlertMessage
                type={typeSession}
                message={messageSession}
              ></AlertMessage>
            </div>
          )}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Layout;
