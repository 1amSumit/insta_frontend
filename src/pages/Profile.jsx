import ProfileTop from "../../UI/ProfileTop";
import { useQuery } from "@tanstack/react-query";
import { getPofileDetails } from "../../services/getProfileDetails";

export default function Profile() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["ProfileDetails"],
    queryFn: getPofileDetails,
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
