/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function MessagesComponent({ message, side }) {
  const isLongMessage = message.length > 20;

  const isImage = message.endsWith(".png");

  return (
    <motion.div
      animate={{ x: [20, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${
        side === "right" ? "self-end" : "self-start"
      } flex justify-center items-center `}
    >
      {!isImage && (
        <p
          className={`${
            side === "right"
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white"
          } md:text-lg text-sm ${
            isLongMessage ? "max-w-[40vw] max-h-[8rem] block" : ""
          } px-[2rem] py-[5px]  rounded-3xl`}
        >
          {message}
        </p>
      )}
      {isImage && (
        <div className="w-[20vw] h-[40vh] rounded-lg">
          <img
            className="h-[100%] w-[100%] rounded-lg"
            src={message}
            alt="post"
          />
        </div>
      )}
    </motion.div>
  );
}
