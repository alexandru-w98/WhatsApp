import React from "react";
import { Microphone, Plus, SmileyFace } from "../icons";
import * as styles from "./chat-footer.css";

const ChatFooter = () => {
  return (
    <div className={styles["footer"]}>
      <Plus />
      <div className={styles["footer__input"]}>
        <SmileyFace />
        <input placeholder="Type a message" />
      </div>
      <Microphone />
    </div>
  );
};

export default ChatFooter;
