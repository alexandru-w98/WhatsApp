import OTP from "../sensitive-constants/OTP";
import { useLazyFetch } from "./use-fetch";

const useSendOTP = (props = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `App ${OTP.API_KEY}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const raw = JSON.stringify({
    applicationId: OTP.APP_ID,
    messageId: OTP.MESSAGE_ID,
    from: "ServiceSMS",
    to: OTP.TO_PHONE_NUMBER,
  });

  const options = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const [useLazySendOtp, { data, loading, error }] = useLazyFetch({
    url: "https://1vl651.api.infobip.com/2fa/2/pin",
    options,
    ...props,
  });

  return [useLazySendOtp, { data, loading, error }];
};

export default useSendOTP;
