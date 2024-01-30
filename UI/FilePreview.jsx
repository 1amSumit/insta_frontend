import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
export default function FilePreview({ onClickedNext }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const modalRef = useRef();
  const file = useSelector((state) => state.fileupload.file);

  const imageUrl = URL.createObjectURL(file);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCancelModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCancelModal]);

  const onCancelCliked = () => {
    setShowCancelModal(true);
  };

  const onDeleteClicked = () => {
    window.location.reload();
  };

  const onNextClickHanler = () => {
    onClickedNext();
  };

  return (
    <div className="px-[1.4rem]" ref={modalRef}>
      <div className="flex flex-row justify-end gap-[1.5rem] mb-4">
        <button onClick={onCancelCliked}>cancel</button>
        <button
          onClick={onNextClickHanler}
          className="bg-blue-500 text-500 hover:bg-blue-400 transition-all duration-200 px-4 py-1 text-white rounded-lg "
        >
          next
        </button>
      </div>
      <div className="w-[15rem] h-[15rem]">
        <img src={imageUrl} alt="upload image" />
      </div>

      {showCancelModal && (
        <motion.div
          animate={{ opacity: [0, 1] }}
          className="absolute w-[20vw] px-[1rem] py-[2rem] shadow-xl rounded-lg bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
        >
          <h2 className="text-2xl text-center">Are you sure?</h2>
          <div className="flex flex-col mt-4">
            <button
              onClick={() => onDeleteClicked()}
              className="text-red-500 text-xl border-b-2 border-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="text-xl border-b-2 border-gray-100 mt-[0.6rem]"
            >
              cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
