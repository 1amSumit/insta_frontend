/* eslint-disable react/prop-types */
import { useState } from "react";
import StatusItem from "./StatusItem";
import { FaRegHeart as Heart, FaHeart as HearFill } from "react-icons/fa";
import { IoChatbubbleOutline as Comment } from "react-icons/io5";
import { IoPaperPlaneOutline as Share } from "react-icons/io5";
import { CiBookmark as Bookmark } from "react-icons/ci";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike } from "../services/updateLike";

export default function Feed({
  username,
  contentUrl,
  likes,
  comments,
  numComments,
  description,
  postId,
}) {
  const [contentIsClicked, setContentIsClicked] = useState(false);
  const [aniCount, setAniCount] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateLike,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const contentClickHandler = (e) => {
    if (e.detail === 2) {
      setAniCount(true);
      setContentIsClicked(true);
      mutate({ id: postId });
    }
  };
  // eslint-disable-next-line react/prop-types
  const isImage = contentUrl.split(".")[3] === "png";

  return (
    <div className="border-b-2 border-slate-200">
      <div className="uername flex flex-row justify-between mb-2">
        <div className="flex flex-row gap-1  items-center">
          <StatusItem size={"small"} />
          <p className="text-sm">{username}</p>
        </div>
        <div>
          <button>
            <p className="text-bold">...</p>
          </button>
        </div>
      </div>
      <div
        className="content relative py-4 flex justify-center"
        onClick={(e) => contentClickHandler(e)}
      >
        {isImage ? (
          <img
            src={contentUrl}
            className="aspect-auto rounded-md"
            alt="feed image"
          />
        ) : (
          <video className="aspect-video rounded-md" autoPlay muted controls>
            <source src={contentUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute  top-[50%] left-[45%] translate-[-50%, -50%]">
          <motion.span
            className="opacity-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: aniCount > 0 ? [0, 1, 0] : "",

              scale: aniCount > 0 ? 3 : "",
            }}
            transition={{ duration: 1 }}
          >
            <img
              className="w-[6rem] h-[6rem]"
              src="/heart.png"
              alt="heart image"
            />
          </motion.span>
        </div>
      </div>
      <div className="reaction">
        <div className="flex justify-between flex-row">
          <div className="like flex flex-row gap-4 text-3xl">
            {contentIsClicked ? (
              <HearFill
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setContentIsClicked(false);
                  setAniCount(false);
                }}
              />
            ) : (
              <Heart
                onClick={() => {
                  setContentIsClicked(true);
                  setAniCount(true);
                }}
                className="cursor-pointer"
              />
            )}
            <Comment />
            <Share />
          </div>
          <div className="text-3xl">
            <Bookmark />
          </div>
        </div>

        <div className="showLikes mt-3 flex flex-row gap-1 items-center">
          <div className="flex itesm-center flex-row ">
            <div>
              <StatusItem size={"smallest"} />
            </div>
            <div className="ml-[-8px]">
              <StatusItem size={"smallest"} />
            </div>
          </div>
          <p className="text-xs flex flex-row gap-1">
            <span>{likes}</span>
            <span className="font-semibold">likes</span>
          </p>
        </div>
        <div className="cntent-description">
          <details>
            <summary>
              <span className="font-salsa">
                {username} {description && description.substring(0, 10)}
              </span>
              {description && description.length > 10 && (
                <span className="font-semibold"> more...</span>
              )}
            </summary>
            <span className="font-sans font-normal text-sm">{description}</span>
          </details>
        </div>
        <div className="view_comments">
          {comments.map((comment) => (
            <p key={comment}>{comment}</p>
          ))}
          <p className="pt-4 font-thin">View all {numComments} comments</p>
        </div>
        <div className="comment_post">
          <form action="#" className="flex mb-2 flex-row justify-between">
            <input
              type="text"
              className="bg-transparent mt-2 font-thin focus:outline-none"
              placeholder="Add a comment"
            />
            <button className="text-blue-500">post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
