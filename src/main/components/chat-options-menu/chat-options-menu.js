import React from "react";
import * as styles from "./chat-options-menu.css";

const ChatOptionsMenu = ({ leftItems, rightItems }) => {
  return (
    <div className={styles["menu"]}>
      <div>{leftItems}</div>
      <div>{rightItems}</div>
    </div>
  );
};

export default ChatOptionsMenu;
