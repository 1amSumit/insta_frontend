import { getAuthToken, getCurrentLoggedInUser } from "../utils/getUserToken";

export const removeProfilePic = async () => {
  const username = getCurrentLoggedInUser();
  const token = getAuthToken();

  const URL = `${
    import.meta.env.VITE_BASE_URL
  }/users/removeProfilPic/${username}`;

  const res = await fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Couldn't update Like");
  }

  await res.json();
};
