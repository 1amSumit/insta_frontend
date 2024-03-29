import { getAuthToken } from "../utils/getUserToken";

export const uploadPost = async (formData) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/posts/uploadPost`;
  const token = getAuthToken();
  const formDatas = new FormData();
  formDatas.append("file", formData.file);
  formDatas.append("description", formData.data.description);
  const res = await fetch(URL, {
    method: "POST",
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
