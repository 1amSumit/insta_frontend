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

function MobileBottomTabBar() {
  const [iconActive, setIconActive] = useState("home");
  return (
    <div className="bg-black border-gray-200 border-t-[1px]  flex flex-row items-center  px-4 py-2 text-gray-100 h-full justify-between">
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
      <div onClick={() => setIconActive("create")} className="text-3xl">
        {iconActive === "create" ? <CreateFill /> : <Create />}
      </div>
      <NavLink className="text-3xl">
        <Message />
      </NavLink>
    </div>
  );
}

export default MobileBottomTabBar;
