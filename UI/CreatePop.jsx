import { useState } from "react";

export default function CreatePop() {
  const [file, setFile] = useState();
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
    setFile(formDataObject.file);
  };

  return (
    <div className="relative">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] rounded-lg shadow-2xl px-2 py-4">
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
      </div>
    </div>
  );
}
