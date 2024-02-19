import { getAuthToken } from "../utils/getUserToken";

export const addComment = async ({ comment, postId }) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/comments/addComment/${postId}`;

  const token = getAuthToken();

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(comment),
  });

  if (!res.ok) {
    throw new Error("Failed to comment at this post");
  }

  return await res.json();
};
