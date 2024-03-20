import { NavLink } from "react-router-dom";
import MessageProfile from "./MessageProfile";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { getInbox } from "../services/getInbox";

/* eslint-disable react/prop-types */
export default function LeftMessages() {
  const loggedInUser = getCurrentLoggedInUser();

  const { data, isLoading } = useQuery({
    queryKey: ["inbox"],
    queryFn: () => getInbox(),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pt-6">
      <h2 className="text-2xl font-salsa">{loggedInUser}</h2>
      <div className="upper flex pt-8 flex-row justify-between px-[1rem]">
        <button className="text-sm">Messages</button>
        <button className="text-sm">Requests</button>
      </div>
      <div className="lower pt-5 flex flex-col gap-2">
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
