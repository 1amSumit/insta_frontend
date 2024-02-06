/* eslint-disable react/prop-types */
import Avatar from "./Avatar";

export default function ProfileTop({ data }) {
  const { userProfile } = data;
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
          <button className="bg-gray-100 px-2 py-1 rounded-lg">
            Edit profile
          </button>
        </div>
        <div className="mt-2 flex felx-row gap-[2rem]">
          <p>
            <span className="font-semibold">{userProfile.numPosts}</span>{" "}
            <span className="text-sm">posts</span>
          </p>
          <p className="">
            <span className="font-semibold">{userProfile.followers}</span>{" "}
            <span>followers</span>
          </p>
          <p className="">
            <span className="font-semibold">{userProfile.followings}</span>{" "}
            <span>following</span>
          </p>
        </div>
      </div>
    </div>
  );
}
