// eslint-disable-next-line react/prop-types
export default function StatusItem({ size, profilePic }) {
  const onClickhandler = () => {};

  const variants = {
    smallest: "w-[1.5rem] h-[]1.5rem] rounded-full",
    small: "w-[3rem] h-[3rem] rounded-full",
    medium: "w-[4rem] h-[4rem] rounded-full",
    large: "w-[6rem] h-[6rem] rounded-full",
  };

  return (
    <button onClick={() => onClickhandler()}>
      <figure className={variants[size]}>
        <img
          src={
            profilePic
              ? profilePic
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="profile picture"
          className="w-[100%] h-[100%] border-2 border-red-300 rounded-full bg-contain"
        />
      </figure>
    </button>
  );
}
