import { getAuthToken } from "../utils/getUserToken";

export const getPofileDetails = async (user) => {
  const token = getAuthToken();
  const URL = `${
    import.meta.env.VITE_BASE_URL
  }/users/getProfileDetails/${user}`;

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
