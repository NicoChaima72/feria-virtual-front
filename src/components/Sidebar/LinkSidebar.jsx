import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { onShowSidebar } from "../../features/uiSlice";

const LinkSidebar = ({ to, icon: Icon, title, notification, end = false }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <NavLink
        to={to}
        end={end}
        onClick={() => dispatch(onShowSidebar(false))}
        className={({ isActive }) =>
          (isActive ? "bg-gray-200" : "bg-gray-50 hover:bg-gray-100") +
          " flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
        }
      >
        <Icon className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></Icon>
        <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
        {notification && notification > 0 && (
          <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-xs font-medium text-green-800 bg-green-200 rounded-full dark:bg-green-900 dark:text-green-200">
            {notification}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default LinkSidebar;
