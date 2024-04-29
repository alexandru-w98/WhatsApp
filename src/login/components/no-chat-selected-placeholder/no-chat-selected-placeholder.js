import React from "react";
import { NoChatSelected, Lock } from "../icons";
import * as styles from "./no-chat-selected-placeholder.css";

const NoChatSelectedPlaceholder = () => {
  return (
    <div className={styles["no-chat"]}>
      <NoChatSelected />
      <div className={styles["no-chat__title"]}>WhatsApp Web</div>
      <div className={styles["no-chat__description"]}>
        Send and receive messages without keeping your phone online.
        <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </div>
      <div className={styles["no-chat__footer"]}>
        <Lock />
        Your personal messages are end-to-end encrypted
      </div>
    </div>
  );
};

export default NoChatSelectedPlaceholder;
