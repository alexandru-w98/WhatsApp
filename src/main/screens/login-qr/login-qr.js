import React, { useRef, useState } from "react";
import * as styles from "./login-qr.module.css";
import qrLoginImg from "../../assets/images/login-qr.png";
import loginTutorial from "../../assets/images/login-tutorial.png";
import loginTutorialVideo from "../../assets/media/login-qr.mp4";
import {
  Settings,
  ArrowRight,
  BurgerMenuWithOutline,
  Logo,
  LogoWithOutline,
} from "../../components/icons";
import { Link } from "react-router-dom";

const LoginQR = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef(null);

  const onVideoPlay = () => {
    setIsVideoActive(true);
    videoRef.current.play();
  };

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
                    <BurgerMenuWithOutline />
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
                <img src={qrLoginImg} draggable={false} />
              </div>
              <div className={styles["qr__logo"]}>
                <LogoWithOutline />
              </div>
            </div>
          </div>
        </div>
        <Link className={styles["link"]} to="#">
          Link with phone number
        </Link>
        <div className={styles["tutorial"]}>
          <div className={styles["tutorial__title"]}>Tutorial</div>
          <Link className={styles["tutorial__link"]} to="#">
            Need help to get started?
          </Link>
          <div className={styles["tutorial__media"]}>
            {!isVideoActive && (
              <button className={styles["media__button"]} onClick={onVideoPlay}>
                <ArrowRight />
              </button>
            )}
            <div className={styles["media__img"]}>
              <video controls ref={videoRef}>
                <source src={loginTutorialVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isVideoActive && <img src={loginTutorial} draggable={false} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginQR;
