import React from "react";
import classNames from "classnames";
import * as styles from "./message.module.css";
import { Check, ContainerCorner, DoubleCheck } from "../icons";
import { cond, equals, always, T } from "ramda";

const timestampToDate = (dateStr) => {
  const date = new Date(Number(dateStr));

  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const StatusIcon = ({ status, className }) => {
  return cond([
    [equals("SENT"), always(<Check className={className} />)],
    [equals("DELIVERED"), always(<DoubleCheck className={className} />)],
    [
      equals("READ"),
      always(<DoubleCheck className={className} color="rgb(83, 189, 235)" />),
    ],
    [T, always(<Check className={className} />)],
  ])(status);
};

const Message = ({ className, align, content, timestamp, status = "SENT" }) => {
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
      <div className={messageClasses}>
        {content}
        <span className={styles["timestamp"]}>
          {timestampToDate(timestamp)}
          {align === "right" && (
            <StatusIcon className={styles["message__status"]} status={status} />
          )}
        </span>
      </div>
      <ContainerCorner className={styles["corner"]} />
    </div>
  );
};

export default Message;
