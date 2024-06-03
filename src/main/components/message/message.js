import React from "react";
import classNames from "classnames";
import * as styles from "./message.module.css";
import { ContainerCorner } from "../icons";

const Message = ({ className, align }) => {
  const messageClasses = classNames(
    styles["message"],
    styles["message--corner"]
  );

  const containerClasses = classNames({
    [styles["container"]]: true,
    [className]: true,
    [styles["align--right"]]: align === "right",
  });

  return (
    <div className={containerClasses}>
      <div className={messageClasses}>hello</div>
      <ContainerCorner className={styles["corner"]} />
    </div>
  );
};

export default Message;
