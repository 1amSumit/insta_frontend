import { useState } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { profilePicUploadActions } from "../store/profilePicUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfilePic } from "../services/uploadProfilePic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { removeProfilePic as removePhoto } from "../services/removeProfilePic";

/* eslint-disable react/prop-types */
export default function Avatar({ image }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [clickedCancel, setClickedCancel] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: removeMutate, isPending: removePending } = useMutation({
    mutationFn: removePhoto,
    onSuccess: () => {
      toast.success("Profile picture uploaded successfully");

      queryClient.invalidateQueries();
      navigate("/");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadProfilePic,
    isPending: () => {
      toast.isPending("loading...");
    },
    onSuccess: () => {
      toast.success("Profile picture uploaded successfully");
      dispatch(profilePicUploadActions.removeFileName());

      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to upload profile picture");
    },
  });

  let file = useSelector((state) => state.profileUpload.file);
  const fileName = file.name;

  let imageUrl;

  if (file.name !== undefined) {
    imageUrl = URL.createObjectURL(file);
  }

  const uploadClickHandler = () => {
    document.getElementById("profile").click();
  };

  const showUploadProfilePicModal = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
    dispatch(profilePicUploadActions.removeFileName());
  };

  const uploadProfile = () => {
    mutate(file);
  };

  const fileChangeHandler = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("fileName", selectedImage.name);
      uploadProfileImage(formData);
    }
  };
  const uploadProfileImage = (data) => {
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    dispatch(profilePicUploadActions.setFileName({ formDataObject }));
  };
  const cancelClicked = () => {
    setClickedCancel(true);
  };

  const removeProfilePic = () => {
    removeMutate();
  };

  if (removePending) {
    return <p>Removing please wait...</p>;
  }

  return (
    <>
      <button
        onClick={showUploadProfilePicModal}
        className="w-[8rem] h-[8rem] rounded-full"
      >
        <img
          src={
            image
              ? image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="user profile image"
          className="w-[100%] h-[100%] rounded-full"
        />
      </button>
      <input
        type="file"
        name="profile"
        id="profile"
        style={{ display: "none" }}
        onChange={(e) => fileChangeHandler(e)}
      />
      {showModal && (
        <Modal isOpen={showModal} onClose={onClose}>
          {fileName === undefined && (
            <div className="flex flex-col justify-center items-center px-[6rem] py-[1rem]">
              <div className="">
                <h2 className="font-semibold text-2xl text-gray-700">
                  Update profile pic
                </h2>
              </div>
              <div className="flex flex-col mt-[1.5rem] gap-[1rem]">
                <motion.button
                  onClick={uploadClickHandler}
                  whileHover={{ scale: [1, 1.1, 1] }}
                  className=""
                >
                  change profile picture
                </motion.button>
                <motion.button
                  whileHover={{ scale: [1, 1.1, 1] }}
                  onClick={removeProfilePic}
                  className="text-red-500"
                >
                  remove profile picture
                </motion.button>
              </div>
            </div>
          )}
          {imageUrl && (
            <div className="relative">
              <div className="flex justify-end gap-4">
                <button onClick={cancelClicked} className="underline">
                  cacel
                </button>
                <button
                  onClick={uploadProfile}
                  disabled={isPending}
                  className="bg-blue-400 px-2 py-1 rounded-lg text-white "
                >
                  {isPending ? "uploading..." : "upload"}
                </button>
              </div>
              <div className="w-[15rem] h-[15rem] mt-2">
                <img
                  src={imageUrl}
                  className="w-[100%] h-[100%]"
                  alt={fileName}
                />
              </div>
              {clickedCancel && (
                <div className="absolute top-[50%] left-[-10%]  translate-y-[-50%]">
                  <div className="bg-white shadow-2xl py-4 rounded-lg w-[20rem] text-center">
                    <p className="text-2xl">Are you sure?</p>
                    <div className="flex flex-col mt-2">
                      <button
                        onClick={() => {
                          setClickedCancel(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setClickedCancel(false);
                          uploadClickHandler();
                        }}
                        className="text-red-500 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
