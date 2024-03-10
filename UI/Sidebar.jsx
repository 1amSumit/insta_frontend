import { NavLink, useParams } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoIosSearch as SearchIcon,
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
import Search from "../UI/Search";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import Notifications from "./Notifications";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../services/getProfileDetails";

export default function Sidebar() {
  const [iconActive, setIconActive] = useState("home");
  const loggedInUser = getCurrentLoggedInUser();

  const params = useParams();
  const { searchedUser } = params;

  const { data } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(loggedInUser),
  });

  useEffect(() => {
    if (searchedUser === loggedInUser) {
      setIconActive("profile");
    }
  }, [searchedUser, loggedInUser]);

  const requestsLength = data?.userProfile?.requestRec.length;

  return (
    <div className="main px-4 py-2 font-salsa relative ">
      <div className="logo ">
        <NavLink to={"/"}>
          <h1 className="text-4xl font-salsa">Instagram</h1>
        </NavLink>
      </div>
      <nav className="pt-8 ">
        <ul className="flex flex-col gap-4 text-[1.4rem]">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setIconActive("home")}
              className={
                iconActive === "home"
                  ? "font-semibold  flex items-center gap-2 bg-gray-100 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
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
            <div
              onClick={() => {
                setIconActive("search");
              }}
              className={
                iconActive === "search"
                  ? "font-semibold  flex cursor-pointer bg-gray-100  items-center gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2 cursor-pointer  hover:bg-gray-100 rounded-xl px-2 py-1"
              }
            >
              {iconActive === "search" ? (
                <div className="">
                  <SearchFill />
                </div>
              ) : (
                <SearchIcon />
              )}
              <span>Search</span>
            </div>
          </li>
          <li>
            <NavLink
              to={"/explore"}
              onClick={() => setIconActive("explore")}
              className={
                iconActive === "explore"
                  ? "font-semibold  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2  hover:bg-gray-100 rounded-xl px-2 py-1"
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
              className={
                iconActive === "reels"
                  ? "font-semibold  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2  hover:bg-gray-100 rounded-xl px-2 py-1"
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
              className={
                iconActive === "message"
                  ? "font-semibold  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2  hover:bg-gray-100 rounded-xl px-2 py-1"
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
            <div
              onClick={() => setIconActive("heart")}
              className={
                iconActive === "notification"
                  ? "font-semibold  cursor-pointer  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2 cursor-pointer  hover:bg-gray-100 rounded-xl px-2 py-1"
              }
            >
              {iconActive === "heart" ? (
                <div className="">
                  <HeartFill />
                </div>
              ) : (
                <Heart />
              )}

              <p className="relative">
                Notifications{" "}
                {requestsLength > 0 && (
                  <span className="absolute bg-red-400 text-white rounded-full w-[1rem] h-[1rem] text-xs flex items-center justify-center top-[-2px] right-[-10px]">
                    {requestsLength}
                  </span>
                )}
              </p>
            </div>
          </li>
          <li>
            <NavLink
              to={"/create"}
              onClick={() => {
                setIconActive("create");
              }}
              className={
                iconActive === "create"
                  ? "font-semibold  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2  hover:bg-gray-100 rounded-xl px-2 py-1"
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
              to={`/${loggedInUser}`}
              onClick={() => {
                setIconActive("profile");
              }}
              className={
                iconActive === "profile"
                  ? "font-semibold  flex items-center bg-gray-100  gap-2 hover:bg-gray-100 rounded-xl px-2 py-1"
                  : "flex items-center gap-2  hover:bg-gray-100 rounded-xl px-2 py-1"
              }
            >
              <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-gray-800"></div>
              <p>Profile</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <AnimatePresence>
        {iconActive === "search" && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 200, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="absolute top-0 left-0 w-[30rem] h-[100vh] translate-x-[14rem] bg-white shadow-xl border-l-[1px] rounded-tr-[3rem] rounded-br-[3rem] border-gray-100 z-[100]"
          >
            <Search
              userClick={() => {
                setIconActive("userclicked");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {iconActive === "heart" && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 200, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="absolute top-0 left-0 w-[30rem] h-[100vh] translate-x-[14rem] bg-white shadow-xl border-l-[1px] rounded-tr-[3rem] rounded-br-[3rem] border-gray-100 z-[100]"
          >
            <Notifications loggedInUser={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
