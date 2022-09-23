import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

const LoadingIndex = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.2}}
      className="bg-gray-50 h-screen flex flex-col items-center justify-center"
    >
      <div className="flex items-center mb-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Feria Virtual
        </span>
      </div>
      <CircularProgress size={30} style={{ color: "#15803d" }} />
    </motion.div>
  );
};

export default LoadingIndex;
