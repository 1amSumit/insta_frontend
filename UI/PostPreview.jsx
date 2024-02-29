/* eslint-disable react/prop-types */
export default function PostPreview({ imageUrl }) {
  return (
    <div className="w-[20rem]">
      <img className="" src={imageUrl} alt="image " />
    </div>
  );
}
