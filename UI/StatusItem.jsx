import { useEffect, useState } from "react";
import Modal from "./Modal";

// eslint-disable-next-line react/prop-types
export default function StatusItem({ size, profilePic, content }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [timerWidth, setTimerWidth] = useState(0);

  useEffect(() => {
    if (modelOpen) {
      const timer = setTimeout(() => {
        setModelOpen(false);
        setTimerWidth(0);
      }, 5000);

      const interval = setInterval(() => {
        setTimerWidth((prevWidth) => prevWidth + (100 / 5000) * 100);
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [modelOpen]);

  const onClickhandler = () => {
    setModelOpen(true);
    setTimerWidth(0);
  };

  const onClose = () => {
    setModelOpen(false);
    setTimerWidth(0);
  };

  const variants = {
    smallest: "w-[1.5rem] h-[1.5rem] rounded-full",
    small: "w-[3rem] h-[3rem] rounded-full",
    medium: "w-[4rem] h-[4rem] rounded-full",
    large: "w-[6rem] h-[6rem] rounded-full",
  };

  return (
    <>
      <button onClick={onClickhandler}>
        <figure className={variants[size]}>
          <img
            src={
              profilePic
                ? profilePic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="profile picture"
            className="w-[100%] h-[100%] border-2 border-red-300 rounded-full bg-contain"
          />
        </figure>
      </button>
      <Modal isOpen={modelOpen} onClose={onClose}>
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <div className="w-[20%] relative h-[80%] rounded-lg text-white">
            <img
              src={content}
              alt="status"
              className="w-full h-full rounded-lg"
            />
            <div
              className="timer absolute h-[0.3rem] rounded-lg top-1 left-0 right-0 bg-gray-500"
              style={{ width: `${timerWidth}%` }}
            ></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
