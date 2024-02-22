import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../services/getProfileDetails";

/* eslint-disable react/prop-types */
export default function NotiProfile({ username }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reqProfile"],
    queryFn: () => getPofileDetails(username),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    throw new Error("Failed to fetch notification. Move to home page.");
  }
  return (
    <div className="flex flex-row bg-gray-100 rounded-lg gap-[1rem] justify-between px-[2rem] items-center">
      <div className="flex flex-row py-[0.5rem] items-center gap-[0.6rem]">
        <figure className="w-[4rem] h-[4rem] rounded-full">
          <img
            className="w-[100%] h-[100%] rounded-full"
            src={data?.userProfile?.profilePic}
            alt=""
          />
        </figure>
        <div>
          <p className="text-sm text-gray-700">{username}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button className="bg-blue-500 rounded-lg px-2 py-1 text-white">
          Confirm
        </button>
        <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}
