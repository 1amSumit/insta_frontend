import FilePreview from "./FilePreview";
import PopupForm from "./PopupForm";
import { useSelector } from "react-redux";

export default function CreatePop() {
  const file = useSelector((state) => state.fileupload.file);
  return (
    <div className="relative">{file ? <FilePreview /> : <PopupForm />}</div>
  );
}
