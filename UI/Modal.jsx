/* eslint-disable react/prop-types */

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CiHeart } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { addComment as addCommentFunc } from "../services/addComment";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Modal = ({ isOpen, onClose, comments, post }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: addCommentFunc,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleComment = (data) => {
    addComment({ comment: data, postId: post.postId });
    reset();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content grid grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post w-[30vw]">
          <div>
            <img src={post.image} alt="post image" />
          </div>
        </div>
        <div className="comments w-[30vw] px-4 py-2">
          <div className="border-b-[2px] border-gray-100">
            <h2 className="font-semibold text-md">{post.username}</h2>
          </div>
          {comments.map((comment) => (
            <ul
              className="flex flex-row gap- mt-4 justify-between items-center"
              key={comment._id}
            >
              <li className="flex flex-row gap-4">
                <p className="text-[0.8rem] font-semibold">
                  {comment.username || ""}
                </p>
                <p className="text-xs"> {comment.comment || ""}</p>
              </li>

              <li className="text-sm">
                <CiHeart />
              </li>
            </ul>
          ))}
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
      <button
        className="absolute text-[2rem] top-[1rem] text-white right-[2rem]"
        onClick={onClose}
      >
        <IoClose />
      </button>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
