/* eslint-disable react/prop-types */
import Feed from "./Feed";

export default function Feeds({ data }) {
  if (data.data.posts.length === 0) {
    return (
      <div>
        <p>Follow someone to see the feed.Search Sumit1234 and follow.</p>
      </div>
    );
  }
  return (
    <main className="flex flex-col justify-center gap-[4rem] sm:px-[4rem] sm:py-[2rem] pb-[5rem]  px-[1.4rem] py-[0.6rem]">
      {data.data.posts.map((post) => (
        <Feed
          key={post._id}
          username={post.user?.username || "abc"}
          contentUrl={post.post}
          likes={post.likes}
          comments={post.comments}
          numComments={post.numComments}
          description={post.description}
          postId={post._id}
          profilePic={post.user.profilePic}
        />
      ))}
    </main>
  );
}
