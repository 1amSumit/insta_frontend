import Feed from "./Feed";
import { getAllPosts } from "../services/getFeeds";
import { useQuery } from "@tanstack/react-query";
import { getCurrentLoggedInUser } from "../utils/getUserToken";

export default function Feeds() {
  const currentLoggedInUser = getCurrentLoggedInUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading feeds</div>;
  }

  return (
    <main className="flex flex-col justify-center gap-[2rem] sm:px-[4rem] sm:py-[2rem]  px-[1.4rem] py-[0.6rem]">
      {data.posts.map((post) => (
        <Feed
          key={post._id}
          username={post.user.username}
          contentUrl={post.post}
          likes={post.likes}
          comments={post.comments}
          numComments={post.numComments}
          description={post.description}
          postId={post._id}
          loggedInUser={currentLoggedInUser}
        />
      ))}
    </main>
  );
}
