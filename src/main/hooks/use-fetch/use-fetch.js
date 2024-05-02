import { useState } from "react";

const useFetch = async ({ url, options }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  try {
    const response = await fetch(url, options);
    setData(response.json());
  } catch (error) {
    setError(error);
  }
  setLoading(false);

  return { data, loading, error };
};

export default useFetch;
