import { getAuthToken } from "../utils/getUserToken";

export const hasAccepted = async (user) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/requests/hasAccepted/${user}`;

  const token = getAuthToken();
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
};
