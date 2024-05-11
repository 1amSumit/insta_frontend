import StatusItem from "./StatusItem";

const statusBarData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1714307410102-8b500822b5e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1714307410102-8b500822b5e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1714307410102-8b500822b5e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1714307410102-8b500822b5e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function StatusBar() {
  const mobileView = window.innerWidth < 600;
  return (
    <aside className="flex flex-row border-b-[1px] border-gray-600 overflow-x-auto px-2 py-5 no-scrollbar">
      <div className="flex gap-2 items-center">
        {statusBarData.map((data) => (
          <StatusItem
            key={data.id}
            size={mobileView ? "small" : "medium"}
            content={data.img}
            profilePic={""}
          />
        ))}
      </div>
    </aside>
  );
}
