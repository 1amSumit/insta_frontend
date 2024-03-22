/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import StatusItem from "./StatusItem";
import { FaRegHeart as Heart, FaHeart as HearFill } from "react-icons/fa";
import { IoChatbubbleOutline as Comment } from "react-icons/io5";
import { IoPaperPlaneOutline as Share } from "react-icons/io5";
import { CiBookmark as Bookmark } from "react-icons/ci";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLike } from "../services/updateLike";
import { useDispatch, useSelector } from "react-redux";
import { LikeAction } from "../store/Like";
import { useForm } from "react-hook-form";
import { addComment as addCommentFunc } from "../services/addComment";
import CommentModal from "./CommentModal";
import { NavLink } from "react-router-dom";
import { VscMute as Mute, VscUnmute as Unmute } from "react-icons/vsc";
import Modal from "./Modal";
import SharePost from "./SharePost";

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
  const { handleSubmit, register, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const likeInfo = useSelector((state) => state.like.likeInfo);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const thisPosthasLike = likeInfo.find((like) => like.postId === postId);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isInView) {
            setIsInView(true);
            videoRef.current.play();
          }
        } else {
          if (isInView) {
            setIsInView(false);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isInView]);

  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: updateLike,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: addCommentFunc,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleComment = (data) => {
    addComment({ comment: data, postId: postId });
    reset();
  };

  const contentClickHandler = (e) => {
    if (e.detail === 2) {
      setAniCount(true);
      setContentIsClicked(true);
      dispatch(
        LikeAction.setLike({
          postId: postId,
        })
      );
      if (!thisPosthasLike) {
        update({ id: postId });
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line react/prop-types
  const isImage = contentUrl.split(".")[3] === "png";

  return (
    <div className="border-b-2 border-slate-200">
      <div className="uername flex flex-row justify-between mb-2">
        <div className="flex flex-row gap-1  items-center">
          <StatusItem size={"small"} />
          <NavLink to={`/${username}`}>{username}</NavLink>
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
          <div className="video-container" style={{ position: "relative" }}>
            <video
              ref={videoRef}
              className="aspect-video rounded-md"
              autoPlay
              muted={isMuted}
            >
              <source src={contentUrl} type="video/mp4" />
            </video>

            <div
              className="video-controls"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "10px",
              }}
            >
              {!isMuted ? (
                <button
                  className="unmute text-white bg-black rounded-full px-1 py-1"
                  onClick={() => setIsMuted(true)}
                >
                  <Unmute />
                </button>
              ) : (
                <button
                  className="muted text-white bg-black rounded-full px-1 py-1"
                  onClick={() => setIsMuted(false)}
                >
                  <Mute />
                </button>
              )}
            </div>
          </div>
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
            {contentIsClicked || thisPosthasLike ? (
              <HearFill
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setContentIsClicked(false);
                  setAniCount(false);
                  update({ id: postId });
                  dispatch(LikeAction.disLike({ postId: postId }));
                }}
              />
            ) : (
              <Heart
                onClick={() => {
                  setContentIsClicked(true);
                  setAniCount(true);
                  update({ id: postId });
                  dispatch(LikeAction.setLike({ postId: postId }));
                }}
                className="cursor-pointer"
              />
            )}
            <Comment onClick={openModal} className="cursor-pointer " />
            <Share
              onClick={() => setShareModalOpen(true)}
              className="cursor-pointer"
            />
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
          <CommentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            comments={comments}
            post={{
              image: contentUrl,
              username: username,
              description: description,
              postId: postId,
            }}
          />
          {comments.length > 0 && (
            <button onClick={openModal} className="pt-4 font-thin">
              View all {numComments} comments
            </button>
          )}
        </div>
        <div className="comment_post">
          <form
            method="POST"
            onSubmit={handleSubmit(handleComment)}
            className="flex mb-2 flex-row justify-between"
          >
            {isPending ? (
              <p className="text-center text-xs mx-[auto] my-0">Adding...</p>
            ) : (
              <input
                type="text"
                className="bg-transparent mt-2 font-thin focus:outline-none"
                placeholder="Add a comment"
                {...register("comment")}
              />
            )}
            <button type="submit" className="text-blue-500">
              post
            </button>
          </form>
        </div>
      </div>

      <Modal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <SharePost onSent={() => setShareModalOpen(false)} />
      </Modal>
    </div>
  );
}
