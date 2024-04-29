import React, { useState } from "react";
import * as styles from "./chat-main-page.css";
import ChatMenuSettings from "../../components/chat-menu-settings";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";
import NoChatSelectedPlaceholder from "../../components/no-chat-selected-placeholder";
import Chat from "../../components/chat";

const ChatMainPage = () => {
  const [selectedItem, setSelectedItem] = useState(true);

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatMenuSettings />
          <ChatHistorySearch />
          <ChatHistoryList setSelectedItem={setSelectedItem} />
        </div>
        <div className={styles["chat__messages"]}>
          {selectedItem ? <Chat /> : <NoChatSelectedPlaceholder />}
        </div>
      </div>
    </div>
  );
};

export default ChatMainPage;
