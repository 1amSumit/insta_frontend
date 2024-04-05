import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/getUserByUSerId";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function MessageProfile({ userId, lastMessage }) {
  const messageId = useParams();
  console.log(userId, messageId);

  const { data, isLoading } = useQuery({
    queryKey: [userId],
    queryFn: () => getUserById(userId),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isImage = lastMessage.endsWith(".png");

  return (
    <div
      className={`flex flex-row hover:bg-gray-300 duration-300 rounded-md gap-4 p-2 border-[1px] border-gray-200 ${
        messageId.messageId === userId ? "bg-gray-300" : ""
      }`}
    >
      <div className="w-[3rem] h-[3rem] rounded-full items-center flex">
        <img
          className="rounded-full w-[100%] h-[100%]"
          src={data.user.profilePic}
          alt={data.user.username}
        />
      </div>
      <div>
        <p className="text-sm">{data.user.username}</p>
        {!isImage && (
          <p className="text-sm text-gray-700">{lastMessage.slice(0, 30)}</p>
        )}
        {isImage && (
          <p className="text-sm text-gray-700">shared an attachment</p>
        )}
      </div>
    </div>
  );
}
