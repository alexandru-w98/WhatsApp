import React from "react";
import { Filter, Search } from "../icons";
import * as styles from "./chat-history-search.css";

const ChatHistorySearch = () => {
  return (
    <div className={styles["search"]}>
      <div className={styles["search__input"]}>
        <Search />
        <input placeholder="Search" />
      </div>
      <div className={styles["search__filters"]}>
        <Filter />
      </div>
    </div>
  );
};

export default ChatHistorySearch;
