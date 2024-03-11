import { NavLink } from "react-router-dom";
import MessageProfile from "./MessageProfile";

/* eslint-disable react/prop-types */
export default function LeftMessages({ loggedInUser }) {
  const { userProfile } = loggedInUser;
  return (
    <div className="px-4 pt-6">
      <h2 className="text-2xl font-salsa">{userProfile.username}</h2>
      <div className="upper flex pt-8 flex-row justify-between px-[1rem]">
        <button className="text-sm">Messages</button>
        <button className="text-sm">Requests</button>
      </div>
      <div className="lower pt-5 flex flex-col gap-2">
        <NavLink to="/direct/t/123">
          <MessageProfile
            username={userProfile.username}
            profilePic={userProfile.profilePic}
            lastMessage={"hi there"}
          />
        </NavLink>
      </div>
    </div>
  );
}
