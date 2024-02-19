import { getAuthToken, getCurrentLoggedInUser } from "../utils/getUserToken";

export const uploadProfilePic = async (formData) => {
  const username = getCurrentLoggedInUser();
  const token = getAuthToken();
  const formDatas = new FormData();
  formDatas.append("file", formData);
  const URL = `${
    import.meta.env.VITE_BASE_URL
  }/users/uploadProfilePic/${username}`;

  const res = await fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formDatas,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
