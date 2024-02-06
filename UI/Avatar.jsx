/* eslint-disable react/prop-types */
export default function Avatar({ image }) {
  return (
    <div className="w-[8rem] h-[8rem] rounded-full">
      <img
        src={
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="user profile image"
        className="w-[100%] h-[100%] rounded-full"
      />
    </div>
  );
}
