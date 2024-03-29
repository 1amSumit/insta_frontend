import { useDispatch } from "react-redux";
import { fileActions } from "../store/Fileupload";

export default function PopupForm() {
  const dispatch = useDispatch();
  const uploadClickHandler = () => {
    document.getElementById("fileInput").click();
  };
  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileName", selectedFile.name);
      uploadFile(formData);
    }
  };

  const uploadFile = (formData) => {
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    dispatch(fileActions.setFileName({ formDataObject }));
  };
  return (
    <>
      <div>
        <p className="font-medium text-center text-lg">create new post</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-[50%] h-[50%] px-4 pt-6"
          src="/upload_gif.gif"
          alt="upload gif"
        />
        <p className="px-10 pb-10">Drag photos and videos</p>
        <button
          onClick={() => {
            uploadClickHandler();
          }}
          className="bg-blue-500 text-white rounded-lg px-4 py-1 font-semibold"
        >
          Select from Computer
        </button>
        <input
          type="file"
          name="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => fileChangeHandler(e)}
        />
      </div>
    </>
  );
}
