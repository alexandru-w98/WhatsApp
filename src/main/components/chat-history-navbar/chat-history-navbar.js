import React from "react";
import ChatOptionsMenu from "../chat-options-menu/chat-options-menu";
import avatarImg from "../../assets/images/avatar.jpg";
import * as styles from "./chat-history-navbar.css";
import { BurgerMenu, Channel, Community, NewChat, Status } from "../icons";

const ChatMenuSettings = () => {
  const leftItems = (
    <div className={styles["avatar"]}>
      <img src={avatarImg} />
    </div>
  );
  const rightItems = (
    <div className={styles["right-items"]}>
      <Community />
      <Status />
      <Channel />
      <NewChat />
      <BurgerMenu />
    </div>
  );

  return <ChatOptionsMenu leftItems={leftItems} rightItems={rightItems} />;
};

export default ChatMenuSettings;
