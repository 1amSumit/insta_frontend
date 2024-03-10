import LeftMessages from "../../UI/LeftMessages";
import RightMessage from "../../UI/RightMessage";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";

export default function Messages() {
  const user = getCurrentLoggedInUser();
  const { data: loggedInUser } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(user),
  });
  return (
    <div className="grid grid-cols-3 h-[100vh]">
      <div className="border-r-[1px] border-r-gray-200">
        <LeftMessages loggedInUser={loggedInUser} />
      </div>
      <div className="col-span-2 ">
        <RightMessage />
      </div>
    </div>
  );
}
