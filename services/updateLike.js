import { getAuthToken } from "../utils/getUserToken";

export const updateLike = async ({ id }) => {
  console.log(id);
  const URL = `http://localhost:8080/api/v1/likes/updateLike/${id}`;
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
