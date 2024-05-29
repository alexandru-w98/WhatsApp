import React from "react";
import { Logo } from "../../components/icons";
import * as styles from "./screen-card.module.css";

const ScreenCard = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper--before"]}></div>
      <div className={styles["logo"]}>
        <Logo />
        <div>WHATASPP WEB</div>
      </div>
      <div className={styles["container__content"]}>{children}</div>
    </div>
  );
};

export default ScreenCard;
