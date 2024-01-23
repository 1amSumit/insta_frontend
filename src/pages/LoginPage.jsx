import { redirect } from "react-router-dom";
import Login from "../../UI/Login";

export default function LoginPage() {
  return <Login />;
}

export const action = async ({ request }) => {
  const url = import.meta.env.VITE_BASE_URL;
  const formData = await request.formData();

  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${url}api/v1/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const resData = await res.json();
  console.log(resData);
  const { token } = resData;
  localStorage.setItem("token", token);

  return redirect("/");
};
