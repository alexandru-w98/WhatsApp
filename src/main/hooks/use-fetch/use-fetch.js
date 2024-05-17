import { useEffect, useState } from "react";

const useFetch = ({ url, options = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      setData(await response.json());
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
