import React from "react";
import { prop } from "ramda";
import ChatNavbar from "../chat-navbar";
import ChatFooter from "../chat-footer";
import * as styles from "./chat.css";
import Message from "../message";

const Chat = ({ data }) => {
  return (
    <div className={styles["chat"]}>
      <ChatNavbar name={prop("name")(data)} />
      <div className={styles["chat__content"]}>
        <Message align="right" />
        <Message />
        <Message />
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
