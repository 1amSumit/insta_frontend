export const getAllPosts = async () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const res = await fetch(`${URL}api/v1/posts/getAllPosts`);
  const data = await res.json();
  return data;
};
