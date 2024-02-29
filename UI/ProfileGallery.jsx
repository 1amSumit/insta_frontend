import PostPreview from "./PostPreview";

/* eslint-disable react/prop-types */
export default function ProfileGallery({ posts }) {
  return (
    <div className="grid grid-cols-3 gap-3 justify-between h-[60vh] overflow-y-scroll no-scrollbar">
      {posts.userPosts.map((post) => (
        <div key={post}>
          <PostPreview imageUrl={post.post} />
        </div>
      ))}
    </div>
  );
}
