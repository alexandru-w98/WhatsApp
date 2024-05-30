import React, { useState, useRef } from "react";
import * as styles from "./chat-main-page.css";
import ChatHistoryNavbar from "../../components/chat-history-navbar";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";
import NoChatSelectedPlaceholder from "../../components/no-chat-selected-placeholder";
import Chat from "../../components/chat";
import withProtectedRoute from "../../hocs/withProtectedRoute";
import { repeat, map, pipe, addIndex } from "ramda";
import CHAT_TYPES from "../../constants/chat";

const mapIndexed = addIndex(map);
const mockHistoryConversations = pipe(
  repeat({}),
  mapIndexed((item, index) => ({
    title: `Test ${index}`,
    id: index,
    type: CHAT_TYPES.CHAT,
  }))
)(20);

const mockSearch = "es";

const ChatMainPage = () => {
  const [selectedItem, setSelectedItem] = useState();
  const searchInputRef = useRef(null);

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatHistoryNavbar />
          <ChatHistorySearch ref={searchInputRef} />
          <ChatHistoryList
            setSelectedItem={setSelectedItem}
            data={mockHistoryConversations}
            searchCriteria={mockSearch}
          />
        </div>
        <div>{selectedItem ? <Chat /> : <NoChatSelectedPlaceholder />}</div>
      </div>
    </div>
  );
};

export default withProtectedRoute(ChatMainPage);
