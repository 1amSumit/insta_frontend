import { useNavigate } from "react-router-dom";
import Signup from "../../UI/Signup";
import { getAuthToken } from "../../utils/getUserToken";
import { useEffect } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const userToken = getAuthToken();

  useEffect(() => {
    if (userToken) {
      return navigate("/");
    }
  }, [userToken, navigate]);
  return <Signup />;
}
