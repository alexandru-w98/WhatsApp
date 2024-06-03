import React from "react";
import { map, filter, pipe, prop, includes, toLower } from "ramda";
import ChatListItem from "../chat-list-item";
import * as styles from "./chat-history-list.css";

const ChatHistoryList = ({ setSelectedItem, data, searchCriteria }) => {
  const onItemSelected = (item) => () => {
    setSelectedItem(item);
  };

  const filteredItems = filter(
    pipe(prop("name"), toLower, includes(toLower(searchCriteria)))
  )(data);

  const mockContent = map((item) => (
    <ChatListItem
      className={styles["list__delimiter"]}
      onClick={onItemSelected(item)}
      searchCriteria={searchCriteria}
      {...item}
    />
  ))(filteredItems);

  return <div className={styles["list"]}>{mockContent}</div>;
};

export default ChatHistoryList;
