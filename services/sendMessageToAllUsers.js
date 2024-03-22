import { getAuthToken } from "../utils/getUserToken";

export const sendMessageToAllUsers = async ({ users, message }) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/messages/sendMessageAllUsers`;
  const token = getAuthToken();

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({ users, message }),
  });

  if (!res.ok) {
    throw new Error("Failed to send messages");
  }

  return await res.json();
};
