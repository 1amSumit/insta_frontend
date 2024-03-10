import Login from "../../UI/Login";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../utils/getUserToken";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const userToken = getAuthToken();

  useEffect(() => {
    if (userToken) {
      return navigate("/");
    }
  }, [userToken, navigate]);

  return <Login />;
}
