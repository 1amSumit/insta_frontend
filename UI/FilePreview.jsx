import { useSelector } from "react-redux";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
export default function FilePreview({ onClickedNext }) {
  const file = useSelector((state) => state.fileupload.file);

  const imageUrl = URL.createObjectURL(file);

  const onCancelCliked = () => {};

  const onNextClickHanler = () => {
    onClickedNext();
  };

  return (
    <Modal>
      <div className="flex flex-row justify-end px-2 gap-[1rem]">
        <button onClick={onCancelCliked}>cancel</button>
        <button
          onClick={onNextClickHanler}
          className="bg-blue-500 text-500 hover:bg-blue-400 transition-all duration-200 px-4 py-1 text-white rounded-lg "
        >
          next
        </button>
      </div>
      <div className="">
        <img src={imageUrl} alt="" />
      </div>
    </Modal>
  );
}
