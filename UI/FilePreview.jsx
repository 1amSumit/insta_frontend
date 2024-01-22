import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export default function FilePreview() {
  const file = useSelector((state) => state.fileupload.file);

  const imageUrl = URL.createObjectURL(file);

  return <div></div>;
}
