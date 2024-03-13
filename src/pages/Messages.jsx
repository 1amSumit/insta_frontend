import LeftMessages from "../../UI/LeftMessages";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";
import { Outlet, useParams } from "react-router-dom";

export default function Messages() {
  const user = getCurrentLoggedInUser();
  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(user),
  });

  const params = useParams();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-3 h-[100vh]">
      <div className="border-r-[1px] border-r-gray-200">
        <LeftMessages loggedInUser={loggedInUser} />
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
