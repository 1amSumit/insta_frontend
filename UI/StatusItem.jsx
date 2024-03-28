// eslint-disable-next-line react/prop-types
export default function StatusItem({ size }) {
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
          src="/avatar/avatar.jpg"
          alt=""
          className="w-[100%] h-[100%] border-2 border-orange-400 rounded-full bg-contain"
        />
      </figure>
    </button>
  );
}
