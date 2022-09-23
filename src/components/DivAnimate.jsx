import { motion } from "framer-motion";
import React, { useEffect } from "react";

const DivAnimate = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "keyframes", duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default DivAnimate;
