import React from "react";
import { repeat } from "ramda";
import ChatHistoryListItem from "../chat-history-list-item";
import * as styles from "./chat-history-list.css";

const ChatHistoryList = () => {
  const mockContent = repeat(
    <ChatHistoryListItem className={styles["list__delimiter"]} />,
    10
  );

  return <div className={styles["list"]}>{mockContent}</div>;
};

export default ChatHistoryList;
