import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { useState } from "react";
import {
  IoIosSearch as Search,
  IoIosAddCircleOutline as Create,
  IoMdAddCircle as CreateFill,
} from "react-icons/io";
import { FaRegCompass as Explore } from "react-icons/fa";
import { FaCompass as ExploreFill } from "react-icons/fa6";
import {
  AiOutlineMessage as Message,
  AiFillMessage as MessageFill,
} from "react-icons/ai";
import { CiHeart as Heart } from "react-icons/ci";
import { FaHeart as HeartFill, FaSearch as SearchFill } from "react-icons/fa";
import { TbMovie as Reels } from "react-icons/tb";

export default function Sidebar() {
  const [iconActive, setIconActive] = useState("home");

  return (
    <div className="main px-4 py-4 font-salsa">
      <div className="logo ">
        <NavLink to={"/"}>
          <h1 className="text-4xl font-salsa">Instagram</h1>
        </NavLink>
      </div>
      <nav className="pt-10">
        <ul className="flex flex-col gap-6 text-[1.4rem]">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setIconActive("home")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "home" ? (
                <div className="">
                  <GoHomeFill />
                </div>
              ) : (
                <GoHome />
              )}
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/search"}
              onClick={() => setIconActive("search")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "search" ? (
                <div className="">
                  <SearchFill />
                </div>
              ) : (
                <Search />
              )}
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/explore"}
              onClick={() => setIconActive("explore")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "explore" ? (
                <div className="">
                  <ExploreFill />
                </div>
              ) : (
                <Explore />
              )}
              <span>Explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/reels"}
              onClick={() => setIconActive("reels")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "reels" ? (
                <div className="">
                  <Reels />
                </div>
              ) : (
                <Reels />
              )}
              <span>Reels</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/direct"}
              onClick={() => setIconActive("message")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "message" ? (
                <div className="">
                  <MessageFill />
                </div>
              ) : (
                <Message />
              )}
              <span>Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/notifications"}
              onClick={() => setIconActive("heart")}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "heart" ? (
                <div className="">
                  <HeartFill />
                </div>
              ) : (
                <Heart />
              )}
              <span>Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/create"}
              onClick={() => {
                setIconActive("create");
              }}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              {iconActive === "create" ? (
                <div className="">
                  <CreateFill />
                </div>
              ) : (
                <Create />
              )}
              <span>Create</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold  flex items-center gap-2"
                  : "flex items-center gap-2"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
