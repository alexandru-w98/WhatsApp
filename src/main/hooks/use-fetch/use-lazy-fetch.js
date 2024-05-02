import { useState } from "react";
import { T } from "ramda";
import isFunction from "../../utils/isFunctions";

const useLazyFetch = ({ url, options = {}, onSuccess = T, onError = T }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const lazyFetch = async (props = {}) => {
    const { urlParams = {}, reqOptions = {} } = props;
    const normalizedUrl = isFunction(url) ? url(urlParams) : url;

    console.log("test", normalizedUrl);
    const normalizedOptions = { ...options, ...reqOptions };

    setLoading(true);
    try {
      const response = await fetch(normalizedUrl, normalizedOptions);
      const data = await response.json();
      setData(data);
      onSuccess(data);
    } catch (error) {
      setError(error);
      onError(error);
    }
    setLoading(false);
  };

  return [lazyFetch, { data, loading, error }];
};

export default useLazyFetch;
