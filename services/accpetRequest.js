import { getAuthToken } from "../utils/getUserToken";

export const acceptRequest = async (user) => {
  const URL = `${
    import.meta.env.VITE_BASE_URL
  }/requests//acceptRequest/${user}`;
  const token = getAuthToken();
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to accept request.");
  }

  return await res.json();
};
