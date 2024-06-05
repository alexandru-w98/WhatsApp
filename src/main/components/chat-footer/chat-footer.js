import React, { useRef } from "react";
import { Microphone, Plus, SmileyFace } from "../icons";
import * as styles from "./chat-footer.css";
import withSocket from "../../hocs/withSocket";

const ChatFooter = ({ socket, currentUserId, toId }) => {
  const inputRef = useRef(null);

  const onSubmitClicked = (e) => {
    if (e.key === "Enter") {
      const message = inputRef.current.value;

      socket.emit("message", {
        content: message,
        from: currentUserId,
        to: toId,
      });

      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles["footer"]}>
      <Plus />
      <div className={styles["footer__input"]}>
        <SmileyFace />
        <input
          placeholder="Type a message"
          onKeyDown={onSubmitClicked}
          ref={inputRef}
        />
      </div>
      <Microphone />
    </div>
  );
};

export default withSocket(ChatFooter);
