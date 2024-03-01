import { getAuthToken } from "../utils/getUserToken";

export const getAllPosts = async () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const token = getAuthToken();
  const res = await fetch(`${URL}/posts/getFeed`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();

  return data;
};
