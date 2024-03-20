import { useMutation } from "@tanstack/react-query";
import { sendFileMessage } from "../services/sendFileMessage";

/* eslint-disable react/prop-types */
export default function ShowMessageImagePreview({ userId, file }) {
  let imageUrl = URL.createObjectURL(file);
  const { mutate } = useMutation({
    mutationFn: sendFileMessage,
  });
  const sendPicture = () => {
    mutate({ userId: userId, message: file });
  };
  return (
    <div className="w-[30rem] h-[40%] flex flex-col gap-4">
      <img className="w-[100%] h-[100%]" src={imageUrl} alt={file.name} />
      <button
        onClick={() => sendPicture()}
        className="bg-blue-500 text-white px-2 py-1 rounded-lg"
      >
        send
      </button>
    </div>
  );
}
