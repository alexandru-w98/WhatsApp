import React, { useEffect, useRef, useState } from "react";
import * as styles from "./video-call.module.css";
import withSocket from "../../hocs/withSocket";
import { path, prop } from "ramda";
import SimplePeer from "simple-peer";

const VideoCall = ({ userProfile, socket }) => {
  const currentUserVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);
  const [currentUserMediaStream, setCurrentUserMediaStream] = useState();
  const [receivedMediaStream, setReceivedMediaStream] = useState();

  useEffect(() => {
    const onMedia = async () => {
      const currentMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setCurrentUserMediaStream(currentMediaStream);
      currentUserVideoRef.current.srcObject = currentMediaStream;
      currentUserVideoRef.current.play();
    };

    onMedia();

    socket.on("videocall", ({ from, streamData }) => {
      setReceivedMediaStream(streamData);
    });
  }, []);

  const onCallUser = () => {
    const toId = path(["contacts", 0, "id"])(userProfile);

    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: currentUserMediaStream,
    });

    peer.on("signal", (data) => {
      socket.emit("videocall", {
        from: prop("id")(userProfile),
        to: toId,
        streamData: data,
      });
    });

    peer.on("stream", (stream) => {
      receiverVideoRef.current.srcObject = stream;
    });

    socket.on("videocall-accepted", ({ streamData }) => {
      peer.signal(streamData);
    });
  };

  const onAnswerCall = () => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: currentUserMediaStream,
    });

    peer.on("signal", (data) => {
      const toId = path(["contacts", 0, "id"])(userProfile);
      socket.emit("videocall-accepted", {
        streamData: data,
        toId,
      });
    });

    peer.on("stream", (stream) => {
      receiverVideoRef.current.srcObject = stream;
    });

    peer.signal(receivedMediaStream);
  };

  return (
    <div>
      <video className={styles["video"]} ref={currentUserVideoRef} />
      <button onClick={onCallUser} autoPlay>
        call
      </button>
      {receivedMediaStream && <button onClick={onAnswerCall}>answer</button>}
      <video className={styles["video"]} ref={receiverVideoRef} autoPlay />
    </div>
  );
};

export default withSocket(VideoCall);
