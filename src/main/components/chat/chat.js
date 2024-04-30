import React from "react";
import ChatNavbar from "../chat-navbar";
import ChatFooter from "../chat-footer";
import * as styles from "./chat.css";

const Chat = () => {
  return (
    <div className={styles["chat"]}>
      <ChatNavbar />
      <div className={styles["chat__content"]}></div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
