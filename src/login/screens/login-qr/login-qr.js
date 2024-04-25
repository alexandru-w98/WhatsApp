import React from "react";
import * as styles from "./login-qr.module.css";
import Logo, { LogoWithOutline } from "../../components/icons/logo";
import BurgerMenu from "../../components/icons/burger-menu";
import qrLoginImg from "../../assets/login-qr.png";
import getStartedImg from "../../assets/get-started-img.png";
import Settings from "../../components/icons/settings";

const LoginQR = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper--before"]}></div>
      <div className={styles["logo"]}>
        <Logo />
        <div>WHATASPP WEB</div>
      </div>
      <div className={styles["container__content"]}>
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
        <a href="#">Link with phone number</a>
        <div>
          <div>Tutorial</div>
          <a href="#">Need help to get started?</a>
          <div>
            <button>test</button>
            <div>
              <img src={getStartedImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginQR;
