import { GoHome, GoHomeFill } from "react-icons/go";
import { FaCompass, FaRegCompass } from "react-icons/fa";
import { IoMdAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { TbMovie as Reels } from "react-icons/tb";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import CreatePop from "./CreatePop";
import { getPofileDetails } from "../services/getProfileDetails";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { useSetRecoilState } from "recoil";
import loggedInUserAtom from "../store/atom/loggedInUserAtom";

function MobileBottomTabBar() {
  const [iconActive, setIconActive] = useState("home");
  const [selectedOption, setSelectedOption] = useState("");
  const [createModelOpen, setCreateModelOpen] = useState(false);

  const loggedInUser = getCurrentLoggedInUser();
  const setLoggedInUserData = useSetRecoilState(loggedInUserAtom);

  const params = useParams();
  const { searchedUser } = params;

  const { data } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(loggedInUser),
  });

  if (data) {
    setLoggedInUserData(data);
  }

  useEffect(() => {
    if (searchedUser === loggedInUser) {
      setIconActive("profile");
    }
  }, [searchedUser, loggedInUser]);

  const createModelClose = () => {
    setCreateModelOpen(false);
    setSelectedOption("");
  };

  return (
    <>
      <div className="bg-black border-gray-200 border-t-[1px] flex flex-row items-center px-4 py-2 text-gray-100 h-full justify-around">
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

        <NavLink
          to={`/${loggedInUser}`}
          onClick={() => {
            setIconActive("profile");
          }}
        >
          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-700"></div>
        </NavLink>
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
