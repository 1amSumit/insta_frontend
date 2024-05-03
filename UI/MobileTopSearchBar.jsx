import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { searchUser } from "../services/searchUser";
import { IoIosCloseCircleOutline as Close } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MobileTopSearchBar() {
  const inputRef = useRef(null);
  const [name, setName] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["search", name],
    queryFn: () => searchUser(name || null),
  });

  return (
    <>
      <div className="flex flex-row relative">
        <div className="instagram logo px-2 text-xl font-salsa">Instagram</div>
        <div className="w-[80%] relative ">
          <input
            className="text-gray-200 bg-stone-700  w-[80%] placeholder:text-gray-200 h-[2rem] font-thin text-sm outline-none pl-[1rem] pr-[3rem] py-3 rounded-lg"
            type="text"
            placeholder="search"
            autoComplete="off"
            autoCorrect="true"
            onChange={(e) => setName(e.target.value)}
            value={name}
            ref={inputRef}
          />
          <Close
            className="absolute top-2 right-20"
            onClick={() => {
              inputRef.current.value = "";
            }}
          />
        </div>
        <div className="notification"></div>
      </div>
      {isLoading ? (
        <div className="users border-t-[1px] absolute top-10 right-3 bg-gray-800 z-40 px-[3rem] py-[1rem] flex flex-col h-auto gap-[1rem] border-gray-200 rounded-lg overflow-y-auto no-scrollbar">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="flex cursor-pointer   px-[1rem] py-[0.6rem] rounded-lg flex-row gap-2"
            >
              <div className="images w-[3rem] h-[3rem] rounded-full">
                <Skeleton circle height={48} width={48} />
              </div>
              <div className="name">
                <Skeleton width={150} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={` users px-[3rem] absolute top-10 right-3 bg-gray-800 z-40  flex flex-col gap-[1rem] h-auto  rounded-lg overflow-y-auto no-scrollbar`}
        >
          {data.data.userData.map((item) => (
            <NavLink
              to={`/${item.username}`}
              key={item.username}
              className="flex cursor-pointer hover:bg-stone-800  px-[1rem] py-[0.6rem] rounded-lg flex-row gap-2"
            >
              <div className="images w-[3rem] h-[3rem] rounded-full">
                <img
                  className="w-[100%] h-[100%] rounded-full"
                  src={item.profilePic}
                  alt={item.name}
                />
              </div>
              <div className="name">
                <p>{item.username}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

export default MobileTopSearchBar;
