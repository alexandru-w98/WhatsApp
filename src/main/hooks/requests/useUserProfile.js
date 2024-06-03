import { useFetch } from "../use-fetch";

const useUserProfile = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
  };
  const { data, loading, error } = useFetch({
    url: "http://localhost:4000/user-profile",
    options,
  });

  return { data, loading, error };
};

export default useUserProfile;
