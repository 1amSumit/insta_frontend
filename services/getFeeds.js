export const getAllPosts = async () => {
  const URL = "https://insta-server-rcp1.onrender.com/";
  const res = await fetch(`${URL}api/v1/posts/getAllPosts`);
  const data = await res.json();
  console.log(data);
  return data;
};
