"use client";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const SectionOneCard = (props: Props) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className="h-full"
    >
      <img
        className="w-full rounded-lg object-cover "
        src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3"
      ></img>
    </motion.div>
  );
};

export default SectionOneCard;
