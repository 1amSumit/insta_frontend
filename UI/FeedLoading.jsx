import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeedLoading = () => {
  return (
    <div className="border-b-2 border-slate-800">
      <div className="username flex flex-row justify-between mb-2">
        <div className="flex flex-row gap-1 items-center">
          {/* <Skeleton width={30} height={30} />
          <Skeleton width={100} /> */}
        </div>
        <div>
          {/* <button>
            <Skeleton width={30} height={30} />
          </button> */}
        </div>
      </div>
      <div className="content relative py-4 flex justify-center">
        <div className="w-full aspect-auto rounded-md">
          <Skeleton height={300} />
        </div>
        <div className="absolute top-[50%] left-[45%] translate-[-50%, -50%]">
          <Skeleton width={60} height={60} />
        </div>
      </div>
      <div className="reaction">
        {/* <div className="flex justify-between flex-row">
          <div className="like flex flex-row gap-4 text-3xl">
            <Skeleton width={30} height={30} />
            <Skeleton width={30} height={30} />
            <Skeleton width={30} height={30} />
          </div>
          <div className="text-3xl">
            <Skeleton width={30} height={30} />
          </div>
        </div> */}

        <div className="showLikes mt-3 flex flex-row gap-1 items-center">
          <div className="flex  flex-col gap-4 ">
            <Skeleton width={200} />
            <Skeleton width={200} />
            {/* <Skeleton width={30} height={30} /> */}
          </div>
          <p className="text-xs flex flex-row gap-1">
            <span>{/* <Skeleton width={200} /> */}</span>
            <span className="font-semibold"></span>
          </p>
        </div>
        <div className="cntent-description">
          <details>
            <summary>
              <span className="font-salsa">
                {/* <Skeleton width={100} /> */}
              </span>
              <span className="font-semibold"></span>
            </summary>
            {/* <span className="font-sans font-normal text-sm">
              <Skeleton count={3} />
            </span> */}
          </details>
        </div>
        {/* <div className="view_comments">
          <button className="pt-4 font-thin">
            <Skeleton width={60} />
          </button>
        </div> */}
        <div className="comment_post">
          <form method="POST" className="flex mb-2 flex-row justify-between">
            <input
              type="text"
              className="bg-transparent mt-2 font-thin focus:outline-none"
              disabled
            />
            <button type="submit" className="text-blue-500" disabled></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedLoading;
