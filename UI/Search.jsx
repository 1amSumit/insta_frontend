import { IoIosCloseCircleOutline as Close } from "react-icons/io";

export default function Search() {
  return (
    <div className="flex flex-col gap-[1rem] ">
      <div className="flex flex-col gap-[3rem] px-[2rem] py-[1rem]">
        <h2 className="text-[1.8rem]">Search</h2>
        <div className="w-full relative ">
          <input
            className="bg-gray-100  w-full placeholder:text-gray-400 h-[3rem] font-thin text-sm outline-none px-2 py-3 rounded-lg"
            type="text"
            placeholder="search"
            autoComplete="false"
            autoCorrect="true"
          />
          <Close className="absolute top-4 right-4" />
        </div>
      </div>

      <div className="border-t-[1px] border-gray-200"></div>
    </div>
  );
}
