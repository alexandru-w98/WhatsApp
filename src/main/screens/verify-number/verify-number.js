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

const defaultSelected = {
  id: 171,
  name: "Romania",
  countryCode: "ro",
  phoneCode: "+40",
};

const onSuccess = (data) => {
  localStorage.setItem("otpID", data.pinId);
};

const VerifyNumber = () => {
  const [sendOTP] = useSendOTP({ onSuccess });
  const [verifyOTP] = useVerifyOTP();
  const { data: options } = useCountries();
  const inputRef = useRef();
  const [queryParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(defaultSelected);

  const onSendOTP = () => {
    const payload = JSON.stringify({
      socketId: queryParams.get("socketId"),
      phone: concat(
        pipe(prop("phoneCode"), slice(1, Infinity))(selectedCountry),
        inputRef.current.value
      ),
    });

    // sendOTP({
    //   reqOptions: {
    //     body: payload,
    //   },
    // });
  };

  const onVerifyOTP = () => {
    const payload = JSON.stringify({
      pin: inputRef.current.value,
      socketId: queryParams.get("socketId"),
      phone: concat(
        pipe(prop("phoneCode"), slice(1, Infinity))(selectedCountry),
        inputRef.current.value
      ),
    });

    // verifyOTP({
    //   reqOptions: {
    //     body: payload,
    //   },
    // });
  };

  const onCountryChanged = (item) => {
    setSelectedCountry(item);
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
        selected={defaultSelected}
        onChanged={onCountryChanged}
      />
      <RoundedInput
        ref={inputRef}
        className={styles["input"]}
        prefix={prop("phoneCode")(selectedCountry)}
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
