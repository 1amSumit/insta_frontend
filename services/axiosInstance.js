import axios from "axios";
import { getAuthToken } from "../utils/getUserToken";

export const axiosInstance = () => {
  const token = getAuthToken();
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
