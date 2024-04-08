/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { LuSend } from "react-icons/lu";

import { searchUser } from "../services/searchUser";
import { sendMessageToAllUsers } from "../services/sendMessageToAllUsers";
import toast from "react-hot-toast";

function SharePost({ onSent, postUrl }) {
  const [name, setName] = useState(null);
  const [nameArr, setNameArr] = useState([]);

  const { mutate } = useMutation({
    mutationFn: sendMessageToAllUsers,
    onSuccess: () => {
      toast.success("message sent to all succeesfully.");
      onSent();
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["searchShare", name],
    queryFn: () => searchUser(name || null),
  });

  const handleChecked = (checked, username, id) => {
    if (checked) {
      setNameArr((prevArr) => [...prevArr, { name: username, id: id }]);
    } else {
      setNameArr((prevArr) => prevArr.filter((user) => user.name !== username));
    }
  };

  const removeNameHandler = (username) => {
    setNameArr((prevArr) => prevArr.filter((user) => user.name !== username));
  };

  const sendMessageToAll = () => {
    mutate({ users: nameArr, message: postUrl });
  };

  let content;

  if (data) {
    content = (
      <div className="mt-[2rem] h-[100%] flex flex-col gap-2 overflow-y-auto no-scrollbar">
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
                checked={nameArr.some((u) => u.name === user.username)}
                onChange={(e) =>
                  handleChecked(e.target.checked, user.username, user._id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="w-[30vw] h-[60vh] px-2  rounded-lg bg-white">
        <div className="border-b-[1px] items-center px-3 py-1 flex flex-row justify-between  brder-b-gray-100">
          <h2 className="">Share to</h2>
          {nameArr.length > 0 && (
            <LuSend
              className="text-2xl cursor-pointer"
              onClick={() => sendMessageToAll()}
            />
          )}
        </div>
        <div className="mt-[1rem]  border-b-[1px] border-b-gray-100 flex-wrap flex flex-row gap-[2rem] pb-2">
          <h2>To:</h2>
          {nameArr.map((user, index) => (
            <div
              className="relative items-center justify-center bg-blue-300 px-4 py-2 rounded-xl"
              key={index}
            >
              <span className="absolute top-[50%] translate-y-[-50%] right-0">
                <IoIosClose
                  className="ml-6 cursor-pointer text-xl mr-0"
                  onClick={() => removeNameHandler(user.name)}
                />
              </span>
              <h2 className="text-sm mr-2">{user.name}</h2>
            </div>
          ))}
          <form>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`${isLoading ? "Searching..." : "Search..."}`}
              className=" outline-none"
            />
          </form>
        </div>
        <div className="h-[38vh]"> {content}</div>
      </div>
    </>
  );
}

export default SharePost;
