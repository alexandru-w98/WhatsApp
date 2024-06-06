import { useFetch } from "../use-fetch";

const useMessages = ({ to, from }) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "GET",
    headers: myHeaders,
  };

  const { data, loading, error } = useFetch({
    url: `http://localhost:4000/messages?to=${to}&from=${from}`,
    options,
  });

  return { data, loading, error };
};

export default useMessages;
