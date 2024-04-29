import React from "react";
import * as styles from "./chat.css";
import ChatMenuSettings from "../../components/chat-menu-settings";

const Chat = () => {
  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatMenuSettings />
        </div>
        <div className={styles["chat__messages"]}>messages</div>
      </div>
    </div>
  );
};

export default Chat;
