import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import {
  IoIosAddCircleOutline as Create,
  IoMdAddCircle as CreateFill,
} from "react-icons/io";
import { FaRegCompass as Explore } from "react-icons/fa";
import { FaCompass as ExploreFill } from "react-icons/fa6";
import {
  AiOutlineMessage as Message,
  AiFillMessage as MessageFill,
} from "react-icons/ai";
import { TbMovie as Reels } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

function MobileBottomTabBar() {
  const [iconActive, setIconActive] = useState("home");
  const [createModelOpen, setCreateModelOpen] = useState(false);
  const createModelClose = () => {
    setCreateModelOpen(false);
  };
  return (
    <>
      <div className="bg-black border-gray-200 border-t-[1px]  flex flex-row items-center  px-4 py-2 text-gray-100 h-full justify-evenly">
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
          {iconActive === "explore" ? <ExploreFill /> : <Explore />}
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
          {iconActive === "create" ? <CreateFill /> : <Create />}
        </div>
        <NavLink className="text-3xl">
          <Message />
        </NavLink>

        <div className="w-[2rem] h-[2rem] rounded-full bg-gray-700"></div>
      </div>
      <Modal isOpen={createModelOpen} onClose={createModelClose}>
        <div className="bg-black text-white px-2 py-1 rounded-lg">
          <div className="mb-4 border-b-[1px] border-gray-200">
            <h2>What do you want to upload?</h2>
          </div>
          <div className="flex py-2 gap-3 flex-col items-center">
            <button className="bg-stone-800 px-2 py-1 rounded-md">
              Upload Status
            </button>
            <button className="bg-stone-800 px-2 py-1 rounded-md">
              Upload Post
            </button>
            <button className="bg-stone-800 px-2 py-1 rounded-md">
              Upload Reel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MobileBottomTabBar;
