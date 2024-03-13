/* eslint-disable react/prop-types */
export default function MessagesComponentReciever({ message }) {
  return (
    <div className="self-start">
      <p className="text-lg inline-block px-[10px] py-1 text-center  bg-gray-100 w-auto rounded-full text-gray-500">
        {message}
      </p>
    </div>
  );
}
