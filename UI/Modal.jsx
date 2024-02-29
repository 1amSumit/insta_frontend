/* eslint-disable react/prop-types */

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <button
        className="absolute text-[2rem] top-[1rem] text-white right-[2rem]"
        onClick={onClose}
      >
        <IoClose />
      </button>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
