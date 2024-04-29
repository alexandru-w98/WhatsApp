import React from "react";
import * as styles from "./chat.css";
import ChatMenuSettings from "../../components/chat-menu-settings";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";

const Chat = () => {
  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatMenuSettings />
          <ChatHistorySearch />
          <ChatHistoryList />
        </div>
        <div className={styles["chat__messages"]}>messages</div>
      </div>
    </div>
  );
};

export default Chat;
