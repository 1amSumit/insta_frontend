/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { uploadPost } from "../services/uploadPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function FilePreview() {
  const queryClient = useQueryClient();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef();
  const file = useSelector((state) => state.fileupload.file);

  let imageUrl = URL.createObjectURL(file);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      toast.success("post succefully uploaded");
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error("error uploading");
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCancelModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCancelModal]);

  const onCancelCliked = () => {
    setShowCancelModal(true);
  };

  const onDeleteClicked = () => {
    window.location.reload();
  };

  const onNextClickHanler = () => {
    setShowDesc(true);
  };

  const formSubmitHandler = (data) => {
    mutate({ file: file, data: data });
    reset();
  };

  if (isPending) {
    return <p>🚀 Uploading please wait...</p>;
  }

  return (
    <div className="px-[1.4rem] flex flex-row gap-[1rem]" ref={modalRef}>
      <div className="">
        <div className="flex flex-row justify-end gap-[1.5rem] mb-4">
          <button onClick={onCancelCliked}>cancel</button>
          {!showDesc && (
            <button
              onClick={onNextClickHanler}
              className="bg-blue-500 text-500 hover:bg-blue-400 transition-all duration-200 px-4 py-1 text-white rounded-lg "
            >
              next
            </button>
          )}
        </div>
        <div className="w-[15rem] h-[15rem]">
          <img src={imageUrl} alt="upload image" />
        </div>
      </div>

      {showDesc && (
        <motion.div
          transition={{ duration: 0.3 }}
          className={`${showDesc ? "block" : "none"}`}
        >
          <form method="POST" onSubmit={handleSubmit(formSubmitHandler)}>
            <label htmlFor="desc">Add description</label>
            <input
              className="border-b-2 outline-none border-gray-300"
              type="text"
              name="description"
              id="description"
              {...register("description")}
            />
            <input
              type="submit"
              className="mt-2  bg-blue-500 text-500 hover:bg-blue-400 transition-all duration-200 px-4 py-1 text-white rounded-lg "
            />
          </form>
        </motion.div>
      )}

      {showCancelModal && (
        <motion.div
          animate={{ opacity: [0, 1] }}
          className="absolute w-[20vw] px-[1rem] py-[2rem] shadow-xl rounded-lg bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
        >
          <h2 className="text-2xl text-center">Are you sure?</h2>
          <div className="flex flex-col mt-4">
            <button
              onClick={() => onDeleteClicked()}
              className="text-red-500 text-xl border-b-2 border-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="text-xl border-b-2 border-gray-100 mt-[0.6rem]"
            >
              cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
