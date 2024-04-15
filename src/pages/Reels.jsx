import { useState } from "react";
import Reel from "../../UI/Reel";

const reels = [
  {
    id: "1",
    path: "/reels/reel.mp4",
  },
  {
    id: "2",
    path: "/reels/reel.mp4",
  },
  {
    id: "3",
    path: "/reels/reel.mp4",
  },
  {
    id: "4",
    path: "/reels/reel.mp4",
  },
];

export default function Reels() {
  const [isMuted, setIsMuted] = useState(true);
  const soundState = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };
  return (
    <div className="h-[100vh] overflow-y-scroll overflow-x-hidden no-scrollbar snap-center">
      {reels.map((r, i) => (
        <div key={i}>
          <Reel videoUrl={r.path} soundState={soundState} isMuted={isMuted} />
        </div>
      ))}
    </div>
  );
}
