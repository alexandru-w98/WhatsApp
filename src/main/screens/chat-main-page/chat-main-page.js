import React, { useState, useRef } from "react";
import * as styles from "./chat-main-page.css";
import ChatHistoryNavbar from "../../components/chat-history-navbar";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";
import NoChatSelectedPlaceholder from "../../components/no-chat-selected-placeholder";
import Chat from "../../components/chat";
import withProtectedRoute from "../../hocs/withProtectedRoute";
import { pipe, isEmpty, not, prop } from "ramda";
import useUserProfile from "../../hooks/requests/useUserProfile";

const ChatMainPage = () => {
  const [selectedItem, setSelectedItem] = useState();
  const searchInputRef = useRef(null);
  const { data: userProfile } = useUserProfile();
  const [chatList, setChatList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");

  const onSearchInputChanged = (val) => {
    setSearchCriteria(val);
    if (pipe(isEmpty, not)(val)) {
      setChatList(prop("contacts")(userProfile));
    } else {
      setChatList([]);
    }
  };

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatHistoryNavbar />
          <ChatHistorySearch
            ref={searchInputRef}
            onChange={onSearchInputChanged}
          />
          <ChatHistoryList
            setSelectedItem={setSelectedItem}
            data={chatList}
            searchCriteria={searchCriteria}
          />
        </div>
        <div>
          {selectedItem ? (
            <Chat data={selectedItem} />
          ) : (
            <NoChatSelectedPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default withProtectedRoute(ChatMainPage);
