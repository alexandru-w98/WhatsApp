import React, { forwardRef, useState } from "react";
import { Filter, Search } from "../icons";
import * as styles from "./chat-history-search.css";

const ChatHistorySearch = ({ onChange }, ref) => {
  const [value, setValue] = useState("");

  const onInputChanged = (e) => {
    setValue(e.target.value);

    onChange(e.target.value);
  };

  return (
    <div className={styles["search"]}>
      <div className={styles["search__input"]}>
        <Search />
        <input
          className={styles["input"]}
          placeholder="Search"
          ref={ref}
          value={value}
          onChange={onInputChanged}
        />
      </div>
      <div className={styles["search__filters"]}>
        <Filter />
      </div>
    </div>
  );
};

export default forwardRef(ChatHistorySearch);
