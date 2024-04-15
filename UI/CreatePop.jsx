import FilePreview from "./FilePreview";
import PopupForm from "./PopupForm";
import { useSelector } from "react-redux";

export default function CreatePop() {
  const file = useSelector((state) => state.fileupload.file);
  return (
    <div className="">
      {file ? (
        <div className=" rounded-lg shadow-2xl px-2 py-4">
          <FilePreview />
        </div>
      ) : (
        <div className=" bg-stone-800 text-gray-200   rounded-lg shadow-2xl px-2 py-4">
          <PopupForm />
        </div>
      )}
    </div>
  );
}
