import { getAuthToken } from "../utils/getUserToken";

export const sendFileMessage = async ({ userId, message }) => {
  const URL = `${import.meta.env.VITE_BASE_URL}/messages/sendMessage/${userId}`;
  const token = getAuthToken();
  const formDatas = new FormData();
  formDatas.append("file", message.file);
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
