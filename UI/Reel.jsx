/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";

function Reel({ videoUrl, soundState, isMuted }) {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  const toggleVideoPlayandPause = (videoRef) => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

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

  return (
    <div className=" flex justify-center flex-col items-center">
      <div className=" flex items-center justify-center h-[100vh] w-auto">
        <div className="relative cursor-pointer">
          <video
            className=" relative h-[90vh] rounded-lg"
            ref={videoRef}
            autoPlay
            muted={isMuted}
            onClick={() => toggleVideoPlayandPause(videoRef)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="bg-gray-100 p-1 cursor-pointer rounded-full absolute top-0 right-0 m-2">
            {isMuted ? (
              <BiVolumeMute onClick={() => soundState()} className="font-xl" />
            ) : (
              <GoUnmute onClick={() => soundState()} className="font-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reel;
