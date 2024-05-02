import React, { useRef } from "react";
import * as styles from "./verify-number.css";
import useSendOTP from "../../hooks/useSendOTP";
import useVerifyOTP from "../../hooks/useVerifyOTP";

const onSuccess = (data) => {
  localStorage.setItem("otpID", data.pinId);
};

const VerifyNumber = () => {
  const [sendOTP] = useSendOTP({ onSuccess });
  const [verifyOTP] = useVerifyOTP();
  const inputRef = useRef();

  const onSendOTP = () => {
    sendOTP();
  };

  const onVerifyOTP = () => {
    const raw = JSON.stringify({
      pin: inputRef.current.value,
    });

    verifyOTP({
      urlParams: {
        pinId: localStorage.getItem("otpID"),
      },
      reqOptions: {
        body: raw,
      },
    });
  };

  return (
    <div className={styles["container"]}>
      <button onClick={onSendOTP}>send code</button>
      <div>
        <input ref={inputRef} />
        <button onClick={onVerifyOTP}>submit</button>
      </div>
    </div>
  );
};

export default VerifyNumber;
