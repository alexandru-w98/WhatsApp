import React, { useEffect, useRef, useState } from "react";
import * as styles from "./calling-modal.module.css";
import Modal from "../modal";
import {
  DefaultProfile,
  MicrophoneMuted,
  Phone,
  PhoneDecline,
  VideoCameraDisabled,
} from "../icons";
import CircleButton from "../circle-button";
import noop from "../noop";
import withSocket from "../../hocs/withSocket";
import { cond, equals, always, T, prop } from "ramda";

const CallingModal = ({
  socket,
  from,
  to,
  toData,
  onCall = noop,
  onClose = noop,
  onAnswer = noop,
  status,
  type,
  ...rest
}) => {
  const currentUserVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);
  const [currentUserMediaStream, setCurrentUserMediaStream] = useState();

  useEffect(() => {
    const onMedia = async () => {
      const currentMediaStream = await navigator.mediaDevices.getUserMedia({
        video: type === "video",
        audio: false,
      });
      setCurrentUserMediaStream(currentMediaStream);
      if (type === "video") {
        currentUserVideoRef.current.srcObject = currentMediaStream;
        currentUserVideoRef.current.play();
      }
      onCall(currentMediaStream, receiverVideoRef);
    };
    onMedia();
  }, [currentUserVideoRef]);

  const receivingButtons = (
    <>
      <CircleButton className={styles["btn--decline"]} onClick={onClose}>
        <PhoneDecline width={42} height={42} />
      </CircleButton>
      <CircleButton
        className={styles["btn--accept"]}
        onClick={() =>
          onAnswer({
            currentStream: currentUserMediaStream,
            to,
            receiverVideoRef,
          })
        }
      >
        <Phone width={22} height={22} />
      </CircleButton>
    </>
  );

  const callingButtons = (
    <>
      <CircleButton className={styles["btn--grey"]} onClick={onClose}>
        <VideoCameraDisabled />
      </CircleButton>
      <CircleButton className={styles["btn--grey"]} onClick={onClose}>
        <MicrophoneMuted width={32} height={32} />
      </CircleButton>
      <CircleButton className={styles["btn--decline"]} onClick={onClose}>
        <PhoneDecline width={42} height={42} />
      </CircleButton>
    </>
  );

  const btns = cond([
    [equals("receiving"), always(receivingButtons)],
    [T, always(callingButtons)],
  ])(status);

  const subtitle = cond([
    [equals("receiving"), always("WhatsApp audio call")],
    [T, always(`ringing +${prop("phone")(toData)}`)],
  ])(status);

  return (
    <Modal {...rest}>
      <div className={styles["container"]}>
        <span className={styles["title"]}>{prop("name")(toData)}</span>
        <span className={styles["subtitle"]}>{subtitle}</span>
        <div className={styles["profile"]}>
          {type === "video" ? (
            <>
              <video
                className={styles["video--current"]}
                ref={currentUserVideoRef}
              />
              <video
                className={styles["video--received"]}
                ref={receiverVideoRef}
                autoPlay
              />
            </>
          ) : (
            <DefaultProfile className={styles["profile--img"]} />
          )}
        </div>
        <div className={styles["buttons"]}>{btns}</div>
      </div>
    </Modal>
  );
};

export default withSocket(CallingModal);
