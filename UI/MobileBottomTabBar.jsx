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

function MobileBottomTabBar() {
  return (
    <div className="bg-black border-gray-200 border-t-[1px]  flex flex-row items-center  px-4 py-2 text-gray-100 h-full justify-between">
      <div className="text-3xl">
        <GoHome />
      </div>
      <div className="text-3xl">
        <Explore />
      </div>
      <div className="text-3xl">
        <Reels />
      </div>
      <div className="text-3xl">
        <Create />
      </div>
      <div className="text-3xl">
        <Message />
      </div>
    </div>
  );
}

export default MobileBottomTabBar;
