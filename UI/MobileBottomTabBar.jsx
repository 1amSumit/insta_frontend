import { GoHome, GoHomeFill } from "react-icons/go";
import { FaCompass, FaRegCompass } from "react-icons/fa";
import { IoMdAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { TbMovie as Reels } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import CreatePop from "./CreatePop";

function MobileBottomTabBar() {
  const [iconActive, setIconActive] = useState("home");
  const [selectedOption, setSelectedOption] = useState("");
  const [createModelOpen, setCreateModelOpen] = useState(false);

  const createModelClose = () => {
    setCreateModelOpen(false);
    setSelectedOption(""); // Reset selectedOption when modal closes
  };

  return (
    <>
      <div className="bg-black border-gray-200 border-t-[1px] flex flex-row items-center px-4 py-2 text-gray-100 h-full justify-evenly">
        <NavLink
          className="text-3xl"
          to={"/"}
          onClick={() => setIconActive("home")}
        >
          {iconActive === "home" ? <GoHomeFill /> : <GoHome />}
        </NavLink>
        <NavLink
          to={"/explore"}
          onClick={() => setIconActive("explore")}
          className="text-3xl"
        >
          {iconActive === "explore" ? <FaCompass /> : <FaRegCompass />}
        </NavLink>
        <NavLink
          to={"/reels/1"}
          onClick={() => setIconActive("reels")}
          className="text-3xl"
        >
          {iconActive === "reels" ? <Reels /> : <Reels />}
        </NavLink>
        <div
          onClick={() => {
            setIconActive("create");
            setCreateModelOpen(true);
          }}
          className="text-3xl"
        >
          {iconActive === "create" ? (
            <IoMdAddCircle />
          ) : (
            <IoIosAddCircleOutline />
          )}
        </div>
        <NavLink
          onClick={() => setIconActive("direct")}
          to={"/direct"}
          className="text-3xl"
        >
          {iconActive === "direct" ? <AiFillMessage /> : <AiOutlineMessage />}
        </NavLink>

        <div className="w-[2rem] h-[2rem] rounded-full bg-gray-700"></div>
      </div>
      <Modal isOpen={createModelOpen} onClose={createModelClose}>
        <div className="bg-black text-white px-2 py-1 rounded-lg">
          {selectedOption === "" ? (
            <div className="mb-4 border-b-[1px] border-gray-200">
              <h2>What do you want to upload?</h2>
            </div>
          ) : null}
          {selectedOption === "" ? (
            <div className="flex py-2 gap-3 flex-col items-center">
              <button
                onClick={() => setSelectedOption("status")}
                className="bg-stone-800 px-2 py-1 rounded-md"
              >
                Upload Status
              </button>
              <button
                onClick={() => setSelectedOption("post")}
                className="bg-stone-800 px-2 py-1 rounded-md"
              >
                Upload Post
              </button>
              <button
                onClick={() => setSelectedOption("reel")}
                className="bg-stone-800 px-2 py-1 rounded-md"
              >
                Upload Reel
              </button>
            </div>
          ) : selectedOption === "post" ? (
            <CreatePop />
          ) : selectedOption === "reel" ? (
            <p>Upload reel</p>
          ) : (
            <p>Upload status</p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default MobileBottomTabBar;
