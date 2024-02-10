import { useState } from "react";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
export default function Avatar({ image }) {
  const [showModal, setShowModal] = useState(false);
  const uploadClickHandler = () => {
    document.getElementById("profile").click();
  };

  const showUploadProfilePicModal = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
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
  const uploadProfileImage = (data) => {};
  return (
    <>
      <button
        onClick={showUploadProfilePicModal}
        className="w-[8rem] h-[8rem] rounded-full"
      >
        <img
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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
          <div>hllo</div>
        </Modal>
      )}
    </>
  );
}
