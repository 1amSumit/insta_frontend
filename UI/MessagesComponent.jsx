/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function MessagesComponent({ message, side }) {
  return (
    <motion.div
      animate={{ x: [20, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${
        side === "right" ? "self-end" : "self-start"
      } flex justify-center items-center `}
    >
      <p
        className={`${
          side === "right" ? "bg-blue-500 text-white" : "bg-gray-400 text-white"
        } text-lg max-w-[40vw] inline-block px-[12px] py-[5px] text-center w-auto rounded-full`}
      >
        {message}
      </p>
    </motion.div>
  );
}
