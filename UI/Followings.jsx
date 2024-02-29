/* eslint-disable react/prop-types */
export default function Followings({ followings }) {
  return (
    <div className="h-[80vh] w-[20vw]">
      <h2 className="font-semibold text-xl font-salsa  border-b-2 border-gray-100">
        Followings
      </h2>

      <div className="mt-[1rem] flex flex-col overflow-y-auto gap-[1rem]">
        {followings.map((fol) => (
          <li
            className="list-none flex flex-row justify-between px-2"
            key={fol}
          >
            <p>{fol}</p>
            <button className="bg-gray-200 px-1 py-1 rounded-lg text-gray-600">
              following
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
