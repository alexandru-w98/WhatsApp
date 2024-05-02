import { useLazyFetch } from "./use-fetch";
import OTP from "../sensitive-constants/OTP";

const useVerifyOTP = (props = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `App ${OTP.API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const options = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const getUrl = ({ pinId }) =>
    `https://1vl651.api.infobip.com/2fa/2/pin/${pinId}/verify`;

  const [useLazySendOtp, { data, loading, error }] = useLazyFetch({
    url: getUrl,
    options,
    ...props,
  });

  return [useLazySendOtp, { data, loading, error }];
};

export default useVerifyOTP;
