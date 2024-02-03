import { getAuthToken } from "../utils/getUserToken";

export const deleteLike = async ({ postId }) => {
  const URL = `${
    import.meta.env.VITE_BASE_URL
  }api/v1/likes/deleteLike/${postId}`;

  const token = getAuthToken();

  const res = await fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Error in deleting");
  }

  return await res.json();
};
