import React from "react";
import { Spinner } from "../icons-animated";
import * as styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles["container"]}>
      <Spinner backgroundColor="rgb(12, 19, 23)" />
    </div>
  );
};

export default Loading;
