import Feed from "./Feed";
import { getAllPosts } from "../services/getFeeds";
import { useQuery } from "@tanstack/react-query";

export default function Feeds() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading feeds</div>;
  }

  return (
    <main className="flex flex-col justify-center gap-[2rem] px-[4rem] py-[2rem]  ">
      {data.posts.map((post) => (
        <Feed
          key={post._id}
          username={post.user.username}
          contentUrl={post.post}
        />
      ))}
    </main>
  );
}
