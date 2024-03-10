import { useQuery } from "@tanstack/react-query";
import Feeds from "../../UI/Feeds";
import StatusBar from "../../UI/StatusBar";
import { getAllPosts } from "../../services/getFeeds";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";

export default function Home() {
  const loggedInUser = getCurrentLoggedInUser();
  const { isLoading, data } = useQuery({
    queryKey: ["feeds", loggedInUser],
    queryFn: getAllPosts,
  });

  return (
    <div className="flex flex-col">
      <StatusBar />

      <main className="h-[80vh] overflow-y-auto no-scrollbar ">
        {isLoading ? <p>Loading...</p> : <Feeds data={data} />}
      </main>
    </div>
  );
}
