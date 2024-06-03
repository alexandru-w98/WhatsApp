import { useFetch } from "../use-fetch";

const useCountries = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "GET",
    headers: myHeaders,
  };

  const { data, loading, error } = useFetch({
    url: "http://localhost:4000/countries",
    options,
  });

  return { data, loading, error };
};

export default useCountries;
