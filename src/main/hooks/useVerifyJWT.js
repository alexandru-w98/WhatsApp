import { useFetch } from "./use-fetch";

const useVerifyJWT = ({ token }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      token,
    }),
  };

  const { data, loading, error } = useFetch({
    url: "http://localhost:4000/verify-token",
    options,
  });

  return { data, loading, error };
};

export default useVerifyJWT;
