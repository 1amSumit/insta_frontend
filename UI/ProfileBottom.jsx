import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserPost } from "../services/getUsersPosts";
import ProfileGallery from "./ProfileGallery";

/* eslint-disable react/prop-types */
export default function ProfileBottom() {
  const { searchedUser } = useParams();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["userPosts", searchedUser],
    queryFn: async () => getUserPost(searchedUser),
  });

  let content;

  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  if (posts) {
    content = <ProfileGallery posts={posts} />;
  }

  return <>{content}</>;
}
