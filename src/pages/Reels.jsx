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
  return (
    <div className="h-[100vh] overflow-y-scroll overflow-x-hidden no-scrollbar snap-center">
      {reels.map((r, i) => (
        <div key={i}>
          <Reel videoUrl={r.path} />
        </div>
      ))}
    </div>
  );
}
