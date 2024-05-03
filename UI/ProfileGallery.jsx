import PostPreview from "./PostPreview";

/* eslint-disable react/prop-types */
export default function ProfileGallery({ posts }) {
  return (
    <div className="grid mt-[2rem]  px-[1rem] md:grid-cols-3 grid-cols-2 md:gap-3 gap-1 md:justify-between h-[60vh] items-center justify-center overflow-y-scroll no-scrollbar">
      {posts.userPosts.map((post) => (
        <div key={post}>
          <PostPreview postUrl={post.post} />
        </div>
      ))}
    </div>
  );
}
