/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import { FaRegHeart as Heart, FaHeart as HearFill } from "react-icons/fa";
import { IoChatbubbleOutline as Comment } from "react-icons/io5";
import { IoPaperPlaneOutline as Share } from "react-icons/io5";
import { CiBookmark as Bookmark } from "react-icons/ci";

function Reel({ videoUrl, soundState, isMuted }) {
  const [isInView, setIsInView] = useState(false);
  const [contentIsClicked, setContentIsClicked] = useState(false);
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
    <div className="flex flex-row items-end justify-center gap-4 mb-[1rem]">
      <div className=" flex justify-center flex-col items-center ">
        <div className=" flex items-center justify-center h-[90vh] w-auto">
          <div className="relative cursor-pointer">
            <video
              className=" relative  h-[85vh] w-full rounded-lg"
              ref={videoRef}
              autoPlay
              muted={isMuted}
              onClick={() => toggleVideoPlayandPause(videoRef)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="bg-gray-100 p-1 cursor-pointer rounded-full absolute top-3 right-0 m-2">
              {isMuted ? (
                <BiVolumeMute
                  onClick={() => soundState()}
                  className="font-xl"
                />
              ) : (
                <GoUnmute onClick={() => soundState()} className="font-xl" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 px-1 ">
              <div className="flex mb-[2rem] text-white flex-col gap-[1rem]">
                <div className="like flex justify-end flex-col gap-[1rem] text-3xl">
                  <div className="flex justify-center items-center flex-col">
                    {contentIsClicked ? (
                      <HearFill
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setContentIsClicked(false);
                        }}
                      />
                    ) : (
                      <Heart className="cursor-pointer text-2xl" />
                    )}
                    <p className="text-xs font-semibold mt-1">100.89k</p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <Comment className="cursor-pointer text-2xl" />
                    <p className="text-xs font-semibold mt-1">100.89k</p>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <Share className="cursor-pointer text-2xl" />
                    <p className="text-xs font-semibold mt-1">100.89k</p>
                  </div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <Bookmark className="text-2xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reel;
