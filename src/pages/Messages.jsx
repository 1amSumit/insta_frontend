import LeftMessages from "../../UI/LeftMessages";
import { Outlet, useParams } from "react-router-dom";

export default function Messages() {
  const params = useParams();

  const mobileWidth = window.innerWidth < 600;
  console.log(mobileWidth, window.innerWidth);

  if (params.messageId && mobileWidth) {
    return (
      <div className="h-[100vh] md:hidden">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-3 h-[100vh] bg-stone-900 text-gray-200">
      <div className="border-r-[1px] border-r-gray-200">
        <LeftMessages />
      </div>
      <div className="md:col-span-2 hidden md:block">
        {!params.messageId ? (
          <div className="h-[100vh] flex justify-center items-center">
            <p>Send photos and messages to frineds on in group.</p>
          </div>
        ) : (
          <div className="h-[100vh]">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
