import React, { useRef, useState, useEffect } from "react";
import * as styles from "./verify-number.module.css";
import useSendOTP from "../../hooks/requests/useSendOTP";
import useVerifyOTP from "../../hooks/requests/useVerifyOTP";
import { useSearchParams } from "react-router-dom";
import withScreenCard from "../../hocs/withScreenCard";
import { Link, useNavigate } from "react-router-dom";
import TutorialVideo from "../../components/tutorial-video";
import RoundedInput from "../../components/rounded-input";
import CountriesDropdownSearch from "../../components/countries-dropdown-search";
import { prop, concat, pipe, slice } from "ramda";
import useCountries from "../../hooks/requests/useCountries";
import PincodeInput from "../../components/pincode-input";
import successGif from "../../assets/media/success.gif";
import withRedirectIfLogged from "../../hocs/withRedirectIfLogged";
import withSocket from "../../hocs/withSocket";
import { setCookie } from "../../utils/cookie";

const defaultSelected = {
  id: 171,
  name: "Romania",
  countryCode: "ro",
  phoneCode: "+40",
};

const VerifyNumber = ({ socket }) => {
  const [sendOTP] = useSendOTP();
  const { data: options } = useCountries();
  const inputRef = useRef();
  const [queryParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(defaultSelected);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verifyInputValue, setVerifyInputValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();

  const onVerifySuccess = () => setIsVerified(true);

  const [verifyOTP] = useVerifyOTP({ onSuccess: onVerifySuccess });

  const onEnableLogin = (token) => {
    setCookie("authToken", token);

    if (queryParams.get("mobile") !== true) {
      navigate("/chat");
    }
  };

  useEffect(() => {
    socket.on("enable-login", (data) => onEnableLogin(prop("token")(data)));
  }, [socket]);

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

    setPhoneNumber(
      concat(
        pipe(prop("phoneCode"), slice(1, Infinity))(selectedCountry),
        inputRef.current.value
      )
    );
    setIsOtpSent(true);
  };

  const onVerifyInputChanged = (val) => {
    setVerifyInputValue(val);
  };

  const onVerifyOTP = () => {
    const payload = JSON.stringify({
      pin: verifyInputValue,
      socketId: queryParams.get("socketId"),
      phone: phoneNumber,
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
      <Link className={styles["link"]} to="/">
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

export default pipe(
  withScreenCard,
  withSocket,
  withRedirectIfLogged
)(VerifyNumber);
