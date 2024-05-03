import { useQuery } from "@tanstack/react-query";
import Feeds from "../../UI/Feeds";
import StatusBar from "../../UI/StatusBar";
import { getAllPosts } from "../../services/getFeeds";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";
import FeedLoading from "../../UI/FeedLoading";
import MobileTopSearchBar from "../../UI/MobileTopSearchBar";

export default function Home() {
  const loggedInUser = getCurrentLoggedInUser();
  const { isLoading, data } = useQuery({
    queryKey: ["feeds", loggedInUser],
    queryFn: getAllPosts,
  });

  return (
    <div className="flex flex-col bg-stone-900 text-gray-100">
      <div className="py-1">
        <MobileTopSearchBar />
      </div>
      <main className="h-[100vh] bg-stone-900 text-gray-100 overflow-y-auto no-scrollbar ">
        {isLoading ? (
          <FeedLoading />
        ) : (
          <>
            <StatusBar />
            <Feeds data={data} />
          </>
        )}
      </main>
    </div>
  );
}
