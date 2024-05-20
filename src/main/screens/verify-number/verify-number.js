import React, { useRef, useState } from "react";
import * as styles from "./verify-number.module.css";
import useSendOTP from "../../hooks/useSendOTP";
import useVerifyOTP from "../../hooks/useVerifyOTP";
import { useSearchParams } from "react-router-dom";
import withScreenCard from "../../hocs/withScreenCard";
import { Link } from "react-router-dom";
import TutorialVideo from "../../components/tutorial-video";
import RoundedInput from "../../components/rounded-input";
import CountriesDropdownSearch from "../../components/countries-dropdown-search";
import { prop, concat, pipe, slice } from "ramda";
import useCountries from "../../hooks/useCountries";
import PincodeInput from "../../components/pincode-input";
import successGif from "../../assets/media/success.gif";

const defaultSelected = {
  id: 171,
  name: "Romania",
  countryCode: "ro",
  phoneCode: "+40",
};

const VerifyNumber = () => {
  const [sendOTP] = useSendOTP();
  const { data: options } = useCountries();
  const inputRef = useRef();
  const [queryParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(defaultSelected);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verifyInputValue, setVerifyInputValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const onVerifySuccess = () => setIsVerified(true);

  const [verifyOTP] = useVerifyOTP({ onSuccess: onVerifySuccess });

  const onSendOTP = () => {
    const payload = JSON.stringify({
      socketId: queryParams.get("socketId"),
      phone: concat(
        pipe(prop("phoneCode"), slice(1, Infinity))(selectedCountry),
        inputRef.current.value
      ),
    });

    sendOTP({
      reqOptions: {
        body: payload,
      },
    });

    setIsOtpSent(true);
  };

  const onVerifyInputChanged = (val) => {
    setVerifyInputValue(val);
  };

  const onVerifyOTP = () => {
    const payload = JSON.stringify({
      pin: verifyInputValue,
      socketId: queryParams.get("socketId"),
    });
    verifyOTP({
      reqOptions: {
        body: payload,
      },
    });
  };

  const onCountryChanged = (item) => {
    setSelectedCountry(item);
  };

  const sentOtpJSX = (
    <>
      <CountriesDropdownSearch
        className={styles["dropdown"]}
        options={options}
        selected={defaultSelected}
        onChanged={onCountryChanged}
      />
      <RoundedInput
        ref={inputRef}
        className={styles["input"]}
        prefix={prop("phoneCode")(selectedCountry)}
        isNumeric
      />
    </>
  );

  const onSubmitClicked = isOtpSent ? onVerifyOTP : onSendOTP;

  const mainForm = (
    <div className={styles["container"]}>
      <div className={styles["title"]}>Enter phone number</div>
      <div className={styles["subtitle"]}>
        Select a country and enter your WhatsApp phone number.
      </div>
      {isOtpSent ? (
        <PincodeInput onChange={onVerifyInputChanged} />
      ) : (
        sentOtpJSX
      )}
      <button className={styles["btn"]} onClick={onSubmitClicked}>
        {isOtpSent ? "Verify Code" : "Next"}
      </button>
      <Link className={styles["link"]} to="#">
        Link with QR code
      </Link>
      <TutorialVideo />
    </div>
  );

  const verifiedJSX = (
    <div className={styles["success"]}>
      <img src={successGif} />
    </div>
  );

  return isVerified ? verifiedJSX : mainForm;
};

export default withScreenCard(VerifyNumber);
