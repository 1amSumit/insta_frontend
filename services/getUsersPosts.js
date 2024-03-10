import { getAuthToken } from "../utils/getUserToken";

export const getUserPost = async (user) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const token = getAuthToken();
  const res = await fetch(`${URL}/posts/getUserPost/${user}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();

  return data;
};
