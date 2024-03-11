import LeftMessages from "../../UI/LeftMessages";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";
import { Outlet } from "react-router-dom";

export default function Messages() {
  const user = getCurrentLoggedInUser();
  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(user),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-3 h-[100vh]">
      <div className="border-r-[1px] border-r-gray-200">
        <LeftMessages loggedInUser={loggedInUser} />
      </div>
      <div className="col-span-2 ">
        <Outlet />
      </div>
    </div>
  );
}
