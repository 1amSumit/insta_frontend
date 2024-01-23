import Signup from "../../UI/Signup";
import { redirect } from "react-router-dom";

export default function SignupPage() {
  return <Signup />;
}

export const action = async ({ request }) => {
  const url = import.meta.env.VITE_BASE_URL;
  const formData = await request.formData();

  const loginData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmpassword"),
  };

  const res = await fetch(`${url}api/v1/users/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (res.status === 500 || res.status === 404) {
    return res;
  }

  const resData = await res.json();
  const { token } = resData;
  // if (!token) {
  //   return null;
  // }
  localStorage.setItem("token", token);
  console.log(resData);

  return redirect("/");
};
