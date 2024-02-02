import { getAuthToken } from "../utils/getUserToken";

export const updateLike = async ({ id }) => {
  console.log(id);
  const URL = `${import.meta.env.VITE_BASE_URL}api/v1/likes/updateLike/${id}`;
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

  console.log(res);

  return await res.json;
};
