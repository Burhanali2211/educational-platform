"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      onClick={scrollToContent}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Scroll to explore
        </span>
        <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </motion.div>
    </motion.div>
  );
}; 