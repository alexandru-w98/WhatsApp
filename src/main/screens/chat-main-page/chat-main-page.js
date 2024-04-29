import React, { useState } from "react";
import * as styles from "./chat-main-page.css";
import ChatHistoryNavbar from "../../components/chat-history-navbar";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";
import NoChatSelectedPlaceholder from "../../components/no-chat-selected-placeholder";
import Chat from "../../components/chat";

const ChatMainPage = () => {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatHistoryNavbar />
          <ChatHistorySearch />
          <ChatHistoryList setSelectedItem={setSelectedItem} />
        </div>
        <div>{selectedItem ? <Chat /> : <NoChatSelectedPlaceholder />}</div>
      </div>
    </div>
  );
};

export default ChatMainPage;
