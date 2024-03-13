import { getAuthToken } from "../utils/getUserToken";

export const getUserById = async (id) => {
  const token = getAuthToken();
  const URL = `${import.meta.env.VITE_BASE_URL}/users/getUser/${id}`;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message);
  }

  return await res.json();
};
