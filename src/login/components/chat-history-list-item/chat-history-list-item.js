import React from "react";
import { DefaultProfile } from "../icons";
import * as styles from "./chat-history-list-item.css";
import classNames from "classnames";

const ChatHistoryListItem = ({ className }) => {
  const containerClasses = classNames(styles["item"], className);

  return (
    <div className={containerClasses}>
      <div className={styles["item__avatar"]}>
        <DefaultProfile />
      </div>
      <div className={styles["item__content"]}>
        <div className={styles["item__header"]}>
          <div className={styles["item__title"]}>Test user</div>
          <div className={styles["item__time"]}>12:00</div>
        </div>
        <div className={styles["item__message"]}>
          Hey there! I am using WhatsApp
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryListItem;
