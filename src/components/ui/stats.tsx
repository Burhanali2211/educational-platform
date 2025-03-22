"use client";

import { motion } from "framer-motion";
import { Book, Users, Code, Star } from "lucide-react";

const stats = [
  {
    label: "Tutorials",
    value: "500+",
    icon: Book,
    color: "text-blue-500",
  },
  {
    label: "Active Learners",
    value: "1,000+",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Projects",
    value: "100+",
    icon: Code,
    color: "text-indigo-500",
  },
  {
    label: "Success Rate",
    value: "95%",
    icon: Star,
    color: "text-sky-500",
  },
];

export const Stats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-0 left-0 right-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 