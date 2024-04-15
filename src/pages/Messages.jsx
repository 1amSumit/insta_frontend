import LeftMessages from "../../UI/LeftMessages";
import { Outlet, useParams } from "react-router-dom";

export default function Messages() {
  const params = useParams();

  return (
    <div className="grid grid-cols-3 h-[100vh] bg-stone-900 text-gray-200">
      <div className="border-r-[1px] border-r-gray-200">
        <LeftMessages />
      </div>
      <div className="col-span-2 ">
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
