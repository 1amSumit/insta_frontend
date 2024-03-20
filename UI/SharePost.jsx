import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

import { searchUser } from "../services/searchUser";

function SharePost() {
  const [name, setName] = useState(null);
  const [nameArr, setNameArr] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["searchShare", name],
    queryFn: () => searchUser(name || null),
  });

  const handleChecked = (checked, username) => {
    if (checked) {
      setNameArr((prevArr) => [...prevArr, username]);
    } else {
      setNameArr((prevArr) => prevArr.filter((name) => name !== username));
    }
  };

  const removeNameHandler = (username) => {
    setNameArr((prevArr) => prevArr.filter((name) => name !== username));
  };

  let content;

  if (data) {
    content = (
      <div className="mt-[2rem]">
        {data.data.userData.map((user) => (
          <div
            key={user._id}
            className="flex flex-row justify-between px-3 items-center"
          >
            <div className="flex flex-row gap-4 items-center">
              <div className="w-[3rem] bg-gray-300 px-2 py-2 items-center justify-center h-[3rem] rounded-full">
                <img
                  className="w-[100%] h-[100%]"
                  src={user.profilePic}
                  alt={`${user.username}'s profile pic`}
                />
              </div>
              <p>{user.username}</p>
            </div>
            <div>
              <input
                type="checkbox"
                checked={nameArr.includes(user.username)}
                onChange={(e) => handleChecked(e.target.checked, user.username)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-[30vw] h-[60vh] px-2  rounded-lg bg-white">
      <div className="border-b-[1px] py-1   brder-b-gray-100">
        <h2 className="text-center">Share to</h2>
      </div>
      <div className="mt-[1rem] border-b-[1px] border-b-gray-100 flex flex-row gap-[2rem] pb-2">
        <h2>To:</h2>
        {nameArr.map((name, index) => (
          <div
            className="relative items-center justify-center bg-blue-300 px-4 py-2 rounded-xl"
            key={index}
          >
            <span className="absolute top-[50%] translate-y-[-50%] right-0">
              <IoIosClose
                className="ml-6 cursor-pointer text-xl mr-0"
                onClick={() => removeNameHandler(name)}
              />
            </span>
            <h2 className="text-sm mr-2">{name}</h2>
          </div>
        ))}
        <form>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${isLoading ? "Searching..." : "Search..."}`}
            className="w-[100%] outline-none"
          />
        </form>
      </div>
      {content}
    </div>
  );
}

export default SharePost;
