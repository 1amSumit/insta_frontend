import { getAuthToken } from "../utils/getUserToken";

export const searchUser = async (user) => {
  const URL = `${
    import.meta.env.VITE_BASE_URL
  }api/v1/users/searchUser?name=${user}`;
  const token = getAuthToken();

  const formData = new FormData();
  formData.append("name", user);

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

  const data = await res.json();

  return data;
};
