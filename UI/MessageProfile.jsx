/* eslint-disable react/prop-types */
export default function MessageProfile({ username, profilePic, lastMessage }) {
  return (
    <div className="flex flex-row hover:bg-gray-100 duration-300 rounded-md gap-4 p-2 border-[1px] border-gray-200">
      <div className="w-[3rem] h-[3rem] rounded-full">
        <img src={profilePic} alt={username} />
      </div>
      <div>
        <p className="text-sm">{username}</p>
        <p className="text-xs">{lastMessage}</p>
      </div>
    </div>
  );
}
