import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/getUserByUSerId";

/* eslint-disable react/prop-types */
export default function MessageProfile({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: [userId],
    queryFn: () => getUserById(userId),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row hover:bg-gray-100 duration-300 rounded-md gap-4 p-2 border-[1px] border-gray-200">
      <div className="w-[3rem] h-[3rem] rounded-full">
        <img src={data.user.profilePic} alt={data.user.username} />
      </div>
      <div>
        <p className="text-sm">{data.user.username}</p>
      </div>
    </div>
  );
}