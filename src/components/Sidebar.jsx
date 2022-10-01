import { Avatar } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/useWindowsSize";
import AvatarName from "./AvatarName";
import GroupIcon from "@mui/icons-material/Group";
import LinkSidebar from "./LinkSidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EggIcon from '@mui/icons-material/Egg';

const Sidebar = () => {
  const { showSidebar } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [width, height] = useWindowSize();

  return (
    <AnimatePresence initial={true} mode="wait">
      {(showSidebar || width > 1000) && (
        <motion.aside
          transition={{ duration: 0.2 }}
          initial={{ x: 72 * -4 }}
          animate={{ x: 0 }}
          exit={{ x: 72 * -4 }}
          key="sidebar"
          className={`${width <= 1000 ? "absolute" : ""} w-72 z-20`}
          aria-label="Sidebar"
        >
          <div className="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 h-screen fixed w-72">
            <a className="flex items-center mb-2">
              <img
                src="/android-chrome-192x192.png"
                className="mr-2 h-10"
                alt="Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Feria Virtual
              </span>
            </a>
            <div className="border"></div>
            <div className="flex items-center space-x-2 py-4">
              <AvatarName name={user.name}></AvatarName>
              <div className="leading-4">
                <p className="m-0">{user.name}</p>
                <span className="text-xs m-0">{user.Role.description}</span>
              </div>
            </div>
            <div className="border"></div>
            <ul className="space-y-2 mt-2">
              <LinkSidebar
                to="/admin"
                icon={DashboardIcon}
                title="Dashboard"
                notification={3}
                end={true}
              ></LinkSidebar>
              <LinkSidebar
                to="/admin/users/locals"
                icon={GroupIcon}
                title="Clientes locales"
              ></LinkSidebar>
              <LinkSidebar
                to="/admin/users/externals"
                icon={GroupIcon}
                title="Clientes extranjeros"
              ></LinkSidebar>
              <LinkSidebar
                to="/admin/users/producers"
                icon={GroupIcon}
                title="Usuarios productores"
              ></LinkSidebar>
              <LinkSidebar
                to="/admin/users/transportists"
                icon={GroupIcon}
                title="Usuarios transportistas"
              ></LinkSidebar>
              <LinkSidebar
                to="/admin/fruits-vegetables"
                icon={EggIcon}
                title="Frutas y verduras"
              ></LinkSidebar>
            </ul>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
