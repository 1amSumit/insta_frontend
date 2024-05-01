import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Suggetions from "./Suggetions";
import { getAuthToken } from "../utils/getUserToken";
import { useEffect } from "react";
import MobileBottomTabBar from "./MobileBottomTabBar";

export default function AppLayout() {
  const navigate = useNavigate();
  const userToken = getAuthToken();
  const url = window.location.pathname;

  useEffect(() => {
    if (userToken === null) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  return (
    <div className="grid relative grid-cols-1 sm:grid-cols-5 h-screen">
      <div className="hidden sm:block bg-stone-900 text-gray-100">
        <Sidebar />
      </div>
      <div className="md:hidden fixed bottom-[0%] left-0 right-0 h-[4rem] z-40">
        <MobileBottomTabBar />
      </div>
      <main
        className={` ${
          url !== "/"
            ? "col-span-4 border-l-[1px] bg-stone-900 border-gray-200 "
            : "col-span-3 bg-stone-900"
        }`}
      >
        <Outlet />
      </main>
      {url === "/" && (
        <div className="hidden sm:block bg-stone-900 text-gray-200">
          <Suggetions />
        </div>
      )}
    </div>
  );
}
