import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { onShowConfirmLogout, onToggleSidebar } from "../features/uiSlice";
import { useDispatch } from "react-redux";
import useWindowSize from "../hooks/useWindowsSize";
import ConfirmLogout from "./ConfirmLogout";

const Navbar = () => {
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();

  return (
    <div className="bg-gray-50 p-3 w-full flex">
      {width <= 1000 && (
        <div
          className="hover:bg-gray-100 inline-block rounded"
          onClick={() => dispatch(onToggleSidebar())}
        >
          <MenuIcon className="cursor-pointer"></MenuIcon>
        </div>
      )}
      <button
        onClick={() => dispatch(onShowConfirmLogout(true))}
        className="ml-auto border border-red-300 hover:border-red-500 text-red-500 hover:text-red-700 rounded py-1 px-2"
      >
        Cerrar sesión
      </button>
      <ConfirmLogout></ConfirmLogout>
    </div>
  );
};

export default Navbar;
