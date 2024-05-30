import React from "react";
import { map } from "ramda";
import ChatListItem from "../chat-list-item";
import * as styles from "./chat-history-list.css";

const ChatHistoryList = ({ setSelectedItem, data, searchCriteria }) => {
  const onItemSelected = () => {
    setSelectedItem(true);
  };

  const mockContent = map((item) => (
    <ChatListItem
      className={styles["list__delimiter"]}
      onClick={onItemSelected}
      searchCriteria={searchCriteria}
      {...item}
    />
  ))(data);

  return <div className={styles["list"]}>{mockContent}</div>;
};

export default ChatHistoryList;
