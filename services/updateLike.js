import { getAuthToken } from "../utils/getUserToken";

export const updateLike = async ({ id }) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/likes/giveLike/${id}`;
  const token = getAuthToken();

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Couldn't update Like");
  }

  return await res.json;
};
