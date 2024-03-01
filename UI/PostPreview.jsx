import { useState } from "react";
import Modal from "./Modal";
/* eslint-disable react/prop-types */
export default function PostPreview({ postUrl }) {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const isVideo = postUrl.split(".").includes("mp4");

  const onClose = () => {
    setShowImagePreview(false);
  };
  const onVideoClose = () => {
    setShowVideoPreview(false);
  };
  return (
    <div className="w-[20rem]">
      {isVideo ? (
        <video
          onClick={() => setShowVideoPreview(true)}
          className="aspect-video cursor-pointer rounded-md"
          muted
        >
          <source src={postUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          onClick={() => setShowImagePreview(true)}
          className="cursor-pointer"
          src={postUrl}
          alt="image "
        />
      )}

      {showImagePreview && (
        <Modal isOpen={showImagePreview} onClose={onClose}>
          <div className="w-[50vw] h-[60vh]">
            <img src={postUrl} alt="image " className="w-[100%] h-[100%]" />
          </div>
        </Modal>
      )}
      {showVideoPreview && (
        <Modal isOpen={showVideoPreview} onClose={onVideoClose}>
          <div className="w-[50vw] h-[60vh]">
            <video
              className="aspect-video rounded-md w-[100%] h-[100%]"
              autoPlay
              muted
            >
              <source src={postUrl} type="video/mp4" />
            </video>
          </div>
        </Modal>
      )}
    </div>
  );
}
