import React, { forwardRef } from "react";
import { Filter, Search } from "../icons";
import * as styles from "./chat-history-search.css";

const ChatHistorySearch = (props, ref) => {
  return (
    <div className={styles["search"]}>
      <div className={styles["search__input"]}>
        <Search />
        <input placeholder="Search" ref={ref} />
      </div>
      <div className={styles["search__filters"]}>
        <Filter />
      </div>
    </div>
  );
};

export default forwardRef(ChatHistorySearch);
