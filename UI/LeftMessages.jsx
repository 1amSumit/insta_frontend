import { NavLink } from "react-router-dom";
import MessageProfile from "./MessageProfile";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { getInbox } from "../services/getInbox";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* eslint-disable react/prop-types */
export default function LeftMessages() {
  const loggedInUser = getCurrentLoggedInUser();

  const { data, isLoading } = useQuery({
    queryKey: ["inbox"],
    queryFn: () => getInbox(),
  });

  if (isLoading) {
    return (
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-salsa">
          <Skeleton width={150} height={20} />
        </h2>
        <div className="upper flex pt-8 flex-row justify-between px-[1rem]">
          <button className="text-sm">
            <Skeleton width={80} height={20} />
          </button>
          <button className="text-sm">
            <Skeleton width={80} height={20} />
          </button>
        </div>
        <div className="lower pt-5 flex flex-col gap-2">
          <NavLink>
            <div className="flex shadow-lg flex-row hover:bg-gray-300 duration-300 rounded-md gap-4 p-2 border-[1px] border-gray-200">
              <div className="w-[3rem] h-[3rem] rounded-full items-center flex">
                <Skeleton circle width={48} height={48} />
              </div>
              <div>
                <Skeleton width={100} />
                <Skeleton count={1} width={150} />
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <h2 className="text-2xl font-salsa">{loggedInUser}</h2>
      <div className="upper flex pt-8 flex-row justify-between px-[1rem]">
        <button className="text-sm">Messages</button>
        <button className="text-sm">Requests</button>
      </div>
      <div className="lower  pt-5 flex flex-col gap-2">
        {data.inboxArr.map((inboxItem) => (
          <NavLink key={inboxItem.id} to={`/direct/t/${inboxItem.id}`}>
            <MessageProfile
              userId={inboxItem.id}
              lastMessage={inboxItem.lastMessage}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
