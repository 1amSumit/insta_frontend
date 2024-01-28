import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Suggetions from "./Suggetions";
import { getAuthToken } from "../utils/getUserToken";
import { useEffect } from "react";

export default function AppLayout() {
  const navigate = useNavigate();
  const userToken = getAuthToken();
  useEffect(() => {
    if (userToken === null) {
      navigate("/login");
    }
  }, [userToken, navigate]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 h-screen">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <main className="border border-1 border-gray-200 col-span-3">
        <Outlet />
      </main>
      <div className="hidden sm:block">
        <Suggetions />
      </div>
    </div>
  );
}
