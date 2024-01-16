export const getAllPosts = async () => {
  const res = await fetch("http://localhost:8080/api/v1/posts/getAllPosts");
  const data = await res.json();
  console.log(data);
  return data;
};
