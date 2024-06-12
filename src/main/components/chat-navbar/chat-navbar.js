import React, { useState } from "react";
import ChatOptionsMenu from "../chat-options-menu/chat-options-menu";
import * as styles from "./chat-navbar.css";
import {
  BurgerMenu,
  Search,
  DefaultProfile,
  PhoneOutline,
  VideoCamera,
} from "../icons";
import CallingModal from "../calling-modal";
import SimplePeer from "simple-peer";
import withSocket from "../../hocs/withSocket";

const ChatNavbar = ({ socket, name, typing, to, from, data }) => {
  const [isCallingModalActive, setIsCallingModalActive] = useState(false);

  const onCallClicked = () => {
    setIsCallingModalActive(true);
  };

  const onCall = (stream, receiverVideoRef) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("videocall", {
        from,
        to,
        streamData: data,
      });
    });

    peer.on("stream", (stream) => {
      receiverVideoRef.current.srcObject = stream;
    });

    socket.on("videocall-accepted", ({ streamData }) => {
      console.log("accepted", receiverVideoRef, streamData);
      peer.signal(streamData);
    });
  };

  const onCallRejected = () => {
    setIsCallingModalActive(false);
  };

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
      <VideoCamera />
      <PhoneOutline onClick={onCallClicked} />
      <BurgerMenu />
    </div>
  );

  return (
    <>
      <ChatOptionsMenu leftItems={leftItems} rightItems={rightItems} />
      {isCallingModalActive && (
        <CallingModal
          onClose={onCallRejected}
          to={to}
          toData={data}
          from={from}
          onCall={onCall}
          type="video"
        />
      )}
    </>
  );
};

export default withSocket(ChatNavbar);
