import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPofileDetails } from "../services/getProfileDetails";
import { acceptRequest } from "../services/accpetRequest";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
export default function NotiProfile({ username }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reqProfile"],
    queryFn: () => getPofileDetails(username),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      toast.success("Request Accpeted Successfully");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Request Failed"),
  });

  if (isLoading || isPending) {
    return <p>Loading...</p>;
  }
  if (isError) {
    throw new Error("Failed to fetch notification. Move to home page.");
  }

  const clickedConfirm = () => {
    mutate(username);
  };

  return (
    <div className="flex flex-row bg-gray-100 rounded-lg gap-[1rem] justify-between px-[2rem] items-center">
      <div className="flex flex-row py-[0.5rem] items-center gap-[0.6rem]">
        <figure className="w-[4rem] h-[4rem] rounded-full">
          <img
            className="w-[100%] h-[100%] rounded-full"
            src={data?.userProfile?.profilePic}
            alt={username}
          />
        </figure>
        <div>
          <p className="text-sm text-gray-700">{username}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={clickedConfirm}
          className="bg-blue-500 rounded-lg px-2 py-1 text-white"
        >
          Confirm
        </button>
        <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}
