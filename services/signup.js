export const signup = async (loginData) => {
  const url = "http://localhost:8080/api/v1/users/signup";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.message);
  }

  const data = await res.json();
  return data;
};
