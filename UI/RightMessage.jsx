/* eslint-disable react/prop-types */
export default function RightMessage({ recieverUserName }) {
  return (
    <div className="flex flex-col">
      <div className="h-[10vh] bg-red-500">
        <h2>{recieverUserName}</h2>
      </div>
      <div className="h-[80vh] bg-black">second</div>
      <div className="h-[10vh] bg-green-500">third</div>
    </div>
  );
}
