import React from "react";
import * as styles from "./login-qr.module.css";
import qrLoginImg from "../../assets/login-qr.png";
import getStartedImg from "../../assets/get-started-img.png";
import {
  Settings,
  ArrowRight,
  BurgerMenu,
  Logo,
  LogoWithOutline,
} from "../../components/icons";
import { Link } from "react-router-dom";

const LoginQR = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper--before"]}></div>
      <div className={styles["logo"]}>
        <Logo />
        <div>WHATASPP WEB</div>
      </div>
      <div className={styles["container__content"]}>
        <div className={styles["login-steps-container"]}>
          <div className={styles["login-steps"]}>
            <div className={styles["steps__list"]}>
              <div className={styles["list__title"]}>
                Use WhatsApp on your computer
              </div>
              <ol className={styles["list__content"]}>
                <li>Open WhatsApp on your phone</li>
                <li>
                  Tap <strong>Menu</strong>{" "}
                  <div className={styles["list__item-icon"]}>
                    <BurgerMenu />
                  </div>{" "}
                  on Android, or <strong>Settings</strong>{" "}
                  <div className={styles["list__item-icon"]}>
                    <Settings />
                  </div>{" "}
                  on iPhone
                </li>
                <li>
                  Tap <strong>Linked devices</strong> and then{" "}
                  <strong>Link a device</strong>
                </li>
                <li>Point your phone at this screen to capture the QR code</li>
              </ol>
            </div>
            <div className={styles["qr"]}>
              <div className={styles["qr__img"]}>
                <img src={qrLoginImg} />
              </div>
              <div className={styles["qr__logo"]}>
                <LogoWithOutline />
              </div>
            </div>
          </div>
        </div>
        <Link className={styles["link"]} to="login-phone-number">
          Link with phone number
        </Link>
        <div className={styles["tutorial"]}>
          <div className={styles["tutorial__title"]}>Tutorial</div>
          <Link className={styles["tutorial__link"]} to="#">
            Need help to get started?
          </Link>
          <div className={styles["tutorial__media"]}>
            <button className={styles["media__button"]}>
              <ArrowRight />
            </button>
            <div className={styles["media__img"]}>
              <img src={getStartedImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginQR;
