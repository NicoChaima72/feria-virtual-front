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
        onClick={() => console.log("hola mundo")}
        style={{ backgroundColor: "rgba(0,0,0, .3)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="confirm-logout"
          className="text-center flex flex-col bg-white p-8 pb-4 rounded-lg"
          ref={ref}
        >
          <h2 className="text-2xl">Cerrar sesión</h2>
          <p>¿Estás seguro que quieres cerrar sesión?</p>
          <div className="flex justify-around mt-8">
            <button
              className="hover:bg-gray-50 py-1 px-4 rounded"
              onClick={() => {
                dispatch(onShowConfirmLogout(false));
              }}
            >
              Cancelar
            </button>
            <button
              className="text-red-500 hover:text-red-700"
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
