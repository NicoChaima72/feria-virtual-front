import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { onShowConfirmLogout } from "../features/uiSlice";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const ConfirmLogout = () => {
  const { showConfirmLogout } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const ref = useRef();

  useOnClickOutside(ref, () => dispatch(onShowConfirmLogout(false)));

  useEffect(() => {
    return () => {
      dispatch(onShowConfirmLogout(false));
    }
  }, [])
  

  return (
    <AnimatePresence>{
    showConfirmLogout && (
      <div
        className="absolute inset-0 z-50 flex justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0, .3)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="confirm-logout"
          className="text-center flex flex-col bg-white rounded-lg"
          ref={ref}
        >
          <div className="p-8 pb-4">
          <h2 className="text-2xl">Cerrar sesión</h2>
          <p>¿Estás seguro que quieres cerrar sesión?</p>

          </div>
          <div className="grid grid-cols-2">
            <button
              className="hover:bg-gray-100 py-4 rounded col-span-1 rounded-bl-lg"
              onClick={() => {
                dispatch(onShowConfirmLogout(false));
              }}
            >
              Cancelar
            </button>
            <button
              className="text-red-500 hover:text-red-700 hover:bg-gray-100 col-span-1 rounded-br-lg"
              onClick={() => dispatch(logout())}
            >
              Cerrar sesión
            </button>
          </div>
        </motion.div>
      </div>
    )}
    </AnimatePresence>
  );
};

export default ConfirmLogout;
