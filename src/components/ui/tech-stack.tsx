"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const technologies = [
  {
    name: "React",
    icon: "/tech/react.svg",
    delay: 0.2,
  },
  {
    name: "Next.js",
    icon: "/tech/nextjs.svg",
    delay: 0.3,
  },
  {
    name: "TypeScript",
    icon: "/tech/typescript.svg",
    delay: 0.4,
  },
  {
    name: "Tailwind CSS",
    icon: "/tech/tailwind.svg",
    delay: 0.5,
  },
  {
    name: "Node.js",
    icon: "/tech/nodejs.svg",
    delay: 0.6,
  },
  {
    name: "Prisma",
    icon: "/tech/prisma.svg",
    delay: 0.7,
  },
  {
    name: "MongoDB",
    icon: "/tech/mongodb.svg",
    delay: 0.8,
  },
];

const getRandomPosition = (index: number) => {
  const positions = [
    { top: "10%", left: "20%" },
    { top: "20%", right: "15%" },
    { top: "60%", left: "10%" },
    { top: "40%", right: "20%" },
    { top: "80%", left: "25%" },
    { top: "30%", left: "50%" },
    { top: "70%", right: "25%" },
  ];
  return positions[index % positions.length];
};

export function TechStack() {
  return (
    <div className="relative h-full w-full">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute"
          style={getRandomPosition(index)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: tech.delay,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="relative h-12 w-12 cursor-pointer transition-transform hover:scale-110"
            whileHover={{ y: -5 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              fill
              className="object-contain p-1"
            />
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
              {tech.name}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default TechStack; 