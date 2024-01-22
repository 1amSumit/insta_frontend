import FilePreview from "./FilePreview";
import PopupForm from "./PopupForm";
import { useSelector } from "react-redux";

export default function CreatePop() {
  const file = useSelector((state) => state.fileupload.file);
  return (
    <div className="relative">
      {file ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] rounded-lg shadow-2xl px-2 py-4">
          <FilePreview />
        </div>
      ) : (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] rounded-lg shadow-2xl px-2 py-4">
          <PopupForm />
        </div>
      )}
    </div>
  );
}
