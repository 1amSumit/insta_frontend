/* eslint-disable react/prop-types */
import NotiProfile from "./NotiProfile";

export default function Notifications({ loggedInUser }) {
  const requestRecs = loggedInUser.userProfile.requestRec;

  return (
    <div className="px-4 h-[100vh] rounded-r-3xl py-4 bg-stone-800">
      <div>
        <div>
          <h2 className="text-3xl tex-gray-200">Notifications</h2>
        </div>
        <div className="mt-[2rem]">
          {requestRecs.length === 0 ? (
            <p className=" my-auto mx-0">No requests.</p>
          ) : (
            <p>Follow Requests</p>
          )}
        </div>
      </div>
      <div className="mt-[1rem] h-[75vh] bg-stone-800 flex flex-col gap-2">
        {requestRecs.map((user) => (
          <NotiProfile key={user} username={user} />
        ))}
      </div>
    </div>
  );
}
