import { getAuthToken } from "../utils/getUserToken";

export const getInbox = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/messages/getInbox`;

  const token = getAuthToken();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    return new Error("Something went wrong.");
  }

  return await res.json();
};
