import React, { useRef } from "react";
import * as styles from "./verify-number.module.css";
import useSendOTP from "../../hooks/useSendOTP";
import useVerifyOTP from "../../hooks/useVerifyOTP";
import { useSearchParams } from "react-router-dom";
import withScreenCard from "../../hocs/withScreenCard";
import { Link } from "react-router-dom";
import TutorialVideo from "../../components/tutorial-video";
import RoundedInput from "../../components/rounded-input";

const onSuccess = (data) => {
  localStorage.setItem("otpID", data.pinId);
};

const VerifyNumber = () => {
  const [sendOTP] = useSendOTP({ onSuccess });
  const [verifyOTP] = useVerifyOTP();
  const inputRef = useRef();
  const [queryParams] = useSearchParams();

  const onSendOTP = () => {
    const payload = JSON.stringify({
      socketId: queryParams.get("socketId"),
      phone: "",
    });

    sendOTP({
      reqOptions: {
        body: payload,
      },
    });
  };

  const onVerifyOTP = () => {
    const raw = JSON.stringify({
      pin: inputRef.current.value,
      socketId: queryParams.get("socketId"),
      phone: "",
    });

    verifyOTP({
      reqOptions: {
        body: raw,
      },
    });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>Enter phone number</div>
      <div className={styles["subtitle"]}>
        Select a country and enter your WhatsApp phone number.
      </div>
      <RoundedInput className={styles["input"]} />
      <button className={styles["btn"]}>Next</button>
      <Link className={styles["link"]} to="#">
        Link with QR code
      </Link>
      <TutorialVideo />
    </div>
  );
};

export default withScreenCard(VerifyNumber);
