import { getAuthToken } from "../utils/getUserToken";

export const sendMessages = async ({ userId, message }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/messages/sendMessage/${userId}`;

  const token = getAuthToken();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
