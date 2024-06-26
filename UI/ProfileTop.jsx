/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

import Avatar from "./Avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../services/sendRequest";
import toast from "react-hot-toast";
import { getCurrentLoggedInUser } from "../utils/getUserToken";
import { hasAccepted } from "../services/hasAccepted";
import { useState } from "react";
import Modal from "./Modal";
import Followers from "./Followers";
import Followings from "./Followings";

export default function ProfileTop({ data, loggedInUser }) {
  const [followersClicked, setFollowersClicked] = useState(false);
  const [followingsClicked, setFollowingsClicked] = useState(false);
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
    enabled: loggedIn !== searchedUser,
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

  const onFollowersClose = () => {
    setFollowersClicked(false);
  };

  const onFollowingsClose = () => {
    setFollowingsClicked(false);
  };

  return (
    <div className=" border-b-[1px] border-gray-600 flex flex-row md:px-2 px-[3rem] py-[3rem] gap-[2rem] md:h-[40vh] h-[30vh] md:items-center md:justify-center  ">
      <div>
        <div className="avatar col-span-1 flex justify-center  items-center">
          <Avatar image={userProfile.profilePic} />
        </div>
      </div>
      <div>
        <div className="details col-span-2 ">
          <div className="flex flex-row md:gap-[3rem] gap-[1rem]">
            <h2 className="font-semibold md:text-[1.2rem] text-[1rem]">
              {userProfile.username}
            </h2>
            {searchedUser === loggedIn && (
              <button className="bg-stone-800 px-2 py-1 rounded-lg">
                Edit profile
              </button>
            )}

            {searchedUser !== loggedIn && hasRequestSent.length === 0 && (
              <button
                onClick={sendFollowRequest}
                className="bg-blue-500 text-white  text-xs md:text-lg px-2 py-1 rounded-lg"
              >
                {isPending ? "sending..." : "follow"}
              </button>
            )}

            {searchedUser !== loggedIn && hasRequestSent.length !== 0 && (
              <button
                onClick={sendFollowRequest}
                className="bg-gray-200 text-gray-900 text-xs md:text-lg  px-2 py-1 rounded-lg"
              >
                {isAccepted ? "following" : "requested"}
              </button>
            )}
            {searchedUser !== loggedIn && (
              <Link
                to={`/direct/t/${data.userProfile._id}`}
                className="bg-blue-500 text-xs md:text-lg text-white px-2 py-1 rounded-lg"
              >
                send message
              </Link>
            )}
          </div>
          <div className="md:mt-6 mt-3 flex flex-row gap-[2rem]">
            <p className="cursor-pointer">
              <span className="font-semibold">{userProfile.numPosts}</span>{" "}
              <span className="md:text-sm text-xs">posts</span>
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                setFollowersClicked(true);
              }}
            >
              <span className="font-semibold">{userProfile.numFollowers}</span>{" "}
              <span className="md:text-sm text-xs">followers</span>
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                setFollowingsClicked(true);
              }}
            >
              <span className="font-semibold">{userProfile.numFollowings}</span>{" "}
              <span className="md:text-sm text-xs">following</span>
            </p>
          </div>
        </div>

        {followersClicked && (
          <Modal isOpen={followersClicked} onClose={onFollowersClose}>
            <Followers followers={data?.userProfile?.followers} />
          </Modal>
        )}
        {followingsClicked && (
          <Modal isOpen={followingsClicked} onClose={onFollowingsClose}>
            <Followings followings={data?.userProfile?.followings} />
          </Modal>
        )}
      </div>
    </div>
  );
}
