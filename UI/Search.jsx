import { IoIosCloseCircleOutline as Close } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { searchUser } from "../services/searchUser";
import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Search() {
  const inputRef = useRef(null);
  const [name, setName] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["search", name],
    queryFn: () => searchUser(name || null),
  });

  return (
    <div className="flex flex-col gap-[1rem] ">
      <div className="flex flex-col gap-[3rem] px-[2rem] py-[1rem]">
        <h2 className="text-[1.8rem]">Search</h2>
        <div className="w-full relative ">
          <input
            className="bg-gray-100  w-full placeholder:text-gray-400 h-[3rem] font-thin text-sm outline-none px-2 py-3 rounded-lg"
            type="text"
            placeholder="search"
            autoComplete="off"
            autoCorrect="true"
            onChange={(e) => setName(e.target.value)}
            value={name}
            ref={inputRef}
          />
          <Close
            className="absolute top-4 right-4"
            onClick={() => {
              inputRef.current.value = "";
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="px-[3rem]">
          <Skeleton height={"50px"} />
        </div>
      ) : data.result === 0 ? (
        <p className="text-center mx-0 my-auto">No user found!</p>
      ) : (
        <div className="users border-t-[1px] h-[100%] overflow-y-hidden px-[3rem] py-[1rem]  flex flex-col gap-[1rem] border-gray-200 rounded-lg">
          {data.data.userData.map((item) => (
            <li key={item.name} className="flex flex-row gap-2">
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
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
