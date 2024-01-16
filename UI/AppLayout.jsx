import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Suggetions from "./Suggetions";

export default function AppLayout() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="">
        <Sidebar />
      </div>
      <main className="border border-1 border-gray-200 col-span-3">
        <Outlet />
      </main>
      <div className="">
        <Suggetions />
      </div>
    </div>
  );
}
