import ProfileTop from "../../UI/ProfileTop";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";
import { useParams } from "react-router-dom";
import { getCurrentLoggedInUser } from "../../utils/getUserToken";

export default function Profile() {
  const params = useParams();
  const loggedInUser = getCurrentLoggedInUser();
  const { searchedUser } = params;
  const { data, isError, isLoading } = useQuery({
    queryKey: [searchedUser],
    queryFn: () => getPofileDetails(searchedUser),
  });
  const { data: loggedInUserData } = useQuery({
    queryKey: [loggedInUser],
    queryFn: () => getPofileDetails(loggedInUser),
  });

  let content;
  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  if (isError) {
    throw new Error("Failed to fetch user. Move to home page.");
  }

  if (data) {
    content = <ProfileTop data={data} loggedInUser={loggedInUserData} />;
  }

  return <div>{content}</div>;
}
