import PostPreview from "./PostPreview";

/* eslint-disable react/prop-types */
export default function ProfileGallery({ posts }) {
  return (
    <div className="grid mt-[2rem]  px-[1rem] grid-cols-3  md:gap-3 gap-1 justify-between h-[60vh]   overflow-y-scroll no-scrollbar">
      {posts.userPosts.map((post) => (
        <div key={post}>
          <PostPreview postUrl={post.post} />
        </div>
      ))}
    </div>
  );
}
