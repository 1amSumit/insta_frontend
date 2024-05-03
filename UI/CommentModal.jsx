/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { addComment as addCommentFunc } from "../services/addComment";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import CModal from "./CModal";

export default function CommentModal({ isOpen, onClose, comments, post }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: addCommentFunc,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const handleComment = (data) => {
    addComment({ comment: data, postId: post.postId });
    reset();
  };
  return (
    <CModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col md:flex-row w-[80vw] mb-[4rem] md:mb-0 h-[80vh]  bg-white">
        <div className="md:w-[60%] h-[40vh] md:h-full p-2">
          <img
            src={post.image}
            alt="post image"
            className="w-[100%] h-[100%]"
          />
        </div>

        <div className="comments md:w-[40%] flex flex-col   px-4 py-2">
          <div className="border-b-[2px] border-gray-100">
            <h2 className="font-semibold text-md">{post.username}</h2>
          </div>
          <div className="overflow-x-hidden md:h-[60vh] h-[25vh]  no-scrollbar overflow-y-scroll">
            {comments.map((comment) => (
              <ul
                className="flex flex-row gap-2 mt-4  justify-between items-center"
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
          </div>
          <form
            method="POST"
            onSubmit={handleSubmit(handleComment)}
            className="flex bg-white border-b-[1px] border-gray-800 mb-2 flex-row justify-between"
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
    </CModal>
  );
}
