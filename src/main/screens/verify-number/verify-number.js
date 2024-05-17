import React, { useRef } from "react";
import * as styles from "./verify-number.module.css";
import useSendOTP from "../../hooks/useSendOTP";
import useVerifyOTP from "../../hooks/useVerifyOTP";
import { useSearchParams } from "react-router-dom";
import withScreenCard from "../../hocs/withScreenCard";
import { Link } from "react-router-dom";
import TutorialVideo from "../../components/tutorial-video";
import RoundedInput from "../../components/rounded-input";
import CountriesDropdownSearch from "../../components/countries-dropdown-search";

const options = [
  {
    name: "Romania",
    countryCode: "ro",
    phoneCode: "+40",
    id: 1,
  },
  {
    name: "United Arab Emirates",
    countryCode: "ae",
    phoneCode: "+402",
    id: 2,
  },
  {
    name: "Anguilla",
    countryCode: "ai",
    phoneCode: "+43",
    id: 3,
  },
];

const onSuccess = (data) => {
  localStorage.setItem("otpID", data.pinId);
};

const VerifyNumber = () => {
  const [sendOTP] = useSendOTP({ onSuccess });
  const [verifyOTP] = useVerifyOTP();
  const inputRef = useRef();
  const [queryParams] = useSearchParams();

  const onSendOTP = () => {
    console.log("test", inputRef.current.value);
    // const payload = JSON.stringify({
    //   socketId: queryParams.get("socketId"),
    //   phone: "",
    // });

    // sendOTP({
    //   reqOptions: {
    //     body: payload,
    //   },
    // });
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
      <CountriesDropdownSearch
        className={styles["dropdown"]}
        options={options}
        selected={options[0]}
      />
      <RoundedInput
        ref={inputRef}
        className={styles["input"]}
        prefix="+40"
        isNumeric
      />
      <button className={styles["btn"]} onClick={onSendOTP}>
        Next
      </button>
      <Link className={styles["link"]} to="#">
        Link with QR code
      </Link>
      <TutorialVideo />
    </div>
  );
};

export default withScreenCard(VerifyNumber);
