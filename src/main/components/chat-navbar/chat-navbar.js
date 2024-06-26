import React from "react";
import ChatOptionsMenu from "../chat-options-menu/chat-options-menu";
import * as styles from "./chat-navbar.css";
import { BurgerMenu, Search, DefaultProfile } from "../icons";

const ChatNavbar = ({ name, typing }) => {
  const leftItems = (
    <div className={styles["left-items"]}>
      <div className={styles["avatar"]}>
        <DefaultProfile width={40} height={40} />
      </div>
      <div className={styles["name-container"]}>
        <div>{name}</div>
        {typing && <div className={styles["typing"]}>Typing...</div>}
      </div>
    </div>
  );
  const rightItems = (
    <div className={styles["right-items"]}>
      <Search width={32} height={32} />
      <BurgerMenu />
    </div>
  );

  return <ChatOptionsMenu leftItems={leftItems} rightItems={rightItems} />;
};

export default ChatNavbar;
