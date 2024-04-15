import ProfileTop from "../../UI/ProfileTop";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";
import { useParams } from "react-router-dom";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";
import ProfileBottom from "../../UI/ProfileBottom";

export default function Profile() {
  const { searchedUser } = useParams();
  const loggedInUser = getCurrentLoggedInUser();

  const {
    data: seachUserData,
    isError,
    isLoading: searchLoading,
  } = useQuery({
    queryKey: [searchedUser],
    queryFn: () => getPofileDetails(searchedUser),
  });

  const { data: loggedInUserData } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: () => getPofileDetails(loggedInUser),
  });

  let content;
  if (searchLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  if (isError) {
    throw new Error("Failed to fetch user. Move to home page.");
  }

  if (seachUserData) {
    content = (
      <div className="text-gray-200">
        <ProfileTop data={seachUserData} loggedInUser={loggedInUserData} />
        <ProfileBottom />
      </div>
    );
  }

  return <div>{content}</div>;
}
