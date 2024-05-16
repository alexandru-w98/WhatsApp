import React, { useEffect, useRef, useState } from "react";
import * as styles from "./login-qr.module.css";
import {
  Settings,
  BurgerMenuWithOutline,
  LogoWithOutline,
} from "../../components/icons";
import { Link } from "react-router-dom";
import withSocket from "../../hocs/withSocket";
import qrcode from "qrcode";
import { pipe } from "ramda";
import withScreenCard from "../../hocs/withScreenCard";
import TutorialVideo from "../../components/tutorial-video";

const LoginQR = ({ socket }) => {
  const canvasRef = useRef(null);
  const [qrToken, setQrToken] = useState("");

  useEffect(() => {
    socket.on("qr-update", (data) => setQrToken(data.qrToken));
    socket.on("enable-login", (data) => console.log("test", data));
  }, [socket]);

  useEffect(() => {
    if (canvasRef && qrToken) {
      const qrPhrase = `http://localhost:4002/verify-number?socketId=${qrToken}`;

      // TODO: remove this when the app is deployed
      // currently used to open the qr in the browser
      console.log("test", qrPhrase);

      qrcode.toCanvas(
        canvasRef.current,
        qrPhrase,
        { width: 264 },
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    }
  }, [canvasRef, qrToken]);

  return (
    <>
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
              <canvas id="qr-canvas" ref={canvasRef} />
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
      <TutorialVideo />
    </>
  );
};

export default pipe(withScreenCard, withSocket)(LoginQR);
