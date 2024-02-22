import { getAuthToken } from "../utils/getUserToken";

export const sendRequest = async (user) => {
  const token = getAuthToken();

  const URL = `${import.meta.env.VITE_BASE_URL}/requests/sendRequest/${user}`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Couldn't send request");
  }

  return await res.json();
};
