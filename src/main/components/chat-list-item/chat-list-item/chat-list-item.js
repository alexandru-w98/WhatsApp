import React from "react";
import { DefaultProfile } from "../../icons";
import * as styles from "./chat-list-item.css";
import classNames from "classnames";
import getHighlightedText from "../../../utils/get-highlighted-text";

const ChatListItem = ({ className, onClick, searchCriteria, name, id }) => {
  const containerClasses = classNames(styles["item"], className);

  return (
    <div className={containerClasses} onClick={onClick} key={id}>
      <div className={styles["item__avatar"]}>
        <DefaultProfile width={50} height={50} />
      </div>
      <div className={styles["item__content"]}>
        <div className={styles["item__header"]}>
          <div className={styles["item__title"]}>
            {getHighlightedText(name, searchCriteria, styles["text-highlight"])}
          </div>
          <div className={styles["item__time"]}>12:00</div>
        </div>
        <div className={styles["item__message"]}>
          Hey there! I am using WhatsApp
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
