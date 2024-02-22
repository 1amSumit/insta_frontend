/* eslint-disable react/prop-types */
import NotiProfile from "./NotiProfile";

export default function Notifications({ loggedInUser }) {
  const requestRecs = loggedInUser.userProfile.requestRec;
  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="text-3xl">Notifications</h2>
      </div>
      <div className="mt-[2rem]">
        <p className="">Follow requests</p>
      </div>
      <div className="mt-[1rem] flex flex-col gap-2">
        {requestRecs.map((user) => (
          <NotiProfile key={user} username={user} />
        ))}
      </div>
    </div>
  );
}
