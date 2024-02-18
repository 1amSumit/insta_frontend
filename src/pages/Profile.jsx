import ProfileTop from "../../UI/ProfileTop";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const { searchedUser } = params;
  const { data, error, isLoading } = useQuery({
    queryKey: [searchedUser],
    queryFn: () => getPofileDetails(searchedUser),
  });

  let content;
  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (data) {
    content = <ProfileTop data={data} />;
  }

  return <div>{content}</div>;
}
