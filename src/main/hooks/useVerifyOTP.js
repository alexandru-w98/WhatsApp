import { useLazyFetch } from "./use-fetch";

const useVerifyOTP = (props = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "POST",
    headers: myHeaders,
  };

  const [useLazySendOtp, { data, loading, error }] = useLazyFetch({
    url: "http://localhost:4000/verify-otp",
    options,
    ...props,
  });

  return [useLazySendOtp, { data, loading, error }];
};

export default useVerifyOTP;
