/* eslint-disable react/prop-types */
export default function MessagesComponentSender({ message }) {
  return (
    <div className="self-end flex justify-center items-center ">
      <p className="text-lg inline-block px-[12px] py-[5px] text-center  bg-blue-500 w-auto rounded-full text-white">
        {message}
      </p>
    </div>
  );
}
