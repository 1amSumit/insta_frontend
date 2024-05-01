import StatusItem from "./StatusItem";

export default function StatusBar() {
  return (
    <aside className="flex flex-row border-b-[1px] border-gray-200 overflow-x-auto px-2 py-5 no-scrollbar">
      <div className="flex gap-2 items-center">
        <StatusItem size={"medium"} />
        <StatusItem size={"medium"} />
        <StatusItem size={"medium"} />
        <StatusItem size={"medium"} />
      </div>
    </aside>
  );
}
