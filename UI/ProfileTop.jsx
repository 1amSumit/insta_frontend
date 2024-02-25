/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";

import Avatar from "./Avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../services/sendRequest";
import toast from "react-hot-toast";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { hasAccepted } from "../services/hasAccepted";

export default function ProfileTop({ data, loggedInUser }) {
  const { userProfile } = data;
  const loggedIn = getCurrentLoggedInUser();
  const params = useParams();
  const { searchedUser } = params;

  const queryClient = useQueryClient();
  const hasRequestSent = loggedInUser.userProfile.requestSent.filter(
    (re) => re === searchedUser
  );

  const { data: acceptData } = useQuery({
    queryKey: ["accpeted"],
    queryFn: () => hasAccepted(searchedUser),
  });
  const isAccepted = acceptData ? acceptData.isAccepted : false;

  const { mutate, isPending } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success("follow request sent.");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("error sending request");
    },
  });

  const sendFollowRequest = () => {
    mutate(searchedUser);
  };

  return (
    <div className=" grid grid-cols-4  gap-[3rem] px-[9rem] pt-[3rem]">
      <div className="avatar col-span-1 flex justify-center items-center">
        <Avatar image={userProfile.profilePic} />
      </div>
      <div className="details col-span-3 ">
        <div className="flex flex-row gap-[3rem]">
          <h2 className="font-semibold text-[1.2rem]">
            {userProfile.username}
          </h2>
          {searchedUser === loggedIn && (
            <button className="bg-gray-100 px-2 py-1 rounded-lg">
              Edit profile
            </button>
          )}
          {searchedUser !== loggedIn && hasRequestSent.length === 0 && (
            <button
              onClick={sendFollowRequest}
              className="bg-blue-500 text-white px-2 py-1 rounded-lg"
            >
              {isPending ? "sending..." : "follow"}
            </button>
          )}
          {searchedUser !== loggedIn && hasRequestSent.length !== 0 && (
            <button
              onClick={sendFollowRequest}
              className="bg-gray-200 text-gray-900  px-2 py-1 rounded-lg"
            >
              {isAccepted ? "following" : "requested"}
            </button>
          )}
        </div>
        <div className="mt-2 flex felx-row gap-[2rem]">
          <p>
            <span className="font-semibold">{userProfile.numPosts}</span>{" "}
            <span className="text-sm">posts</span>
          </p>
          <p className="">
            <span className="font-semibold">{userProfile.numFollowers}</span>{" "}
            <span>followers</span>
          </p>
          <p className="">
            <span className="font-semibold">{userProfile.numFollowings}</span>{" "}
            <span>following</span>
          </p>
        </div>
      </div>
    </div>
  );
}
