import React, { useState, useEffect } from "react";
import {
  prop,
  map,
  pipe,
  equals,
  prepend,
  not,
  when,
  assoc,
  includes,
  pluck,
} from "ramda";
import ChatNavbar from "../chat-navbar";
import ChatFooter from "../chat-footer";
import * as styles from "./chat.css";
import withSocket from "../../hocs/withSocket";
import useMessages from "../../hooks/requests/useMessages";
import Message from "../message";
import isNotEmptyOrNil from "../../utils/is-not-empty-or-nil";

export const updateMessages = (messages, ids) =>
  map(
    when(
      (item) =>
        includes(prop("id")(item), ids) &&
        pipe(prop("status"), equals("READ"), not)(item),
      assoc("status", "DELIVERED")
    ),
    messages
  );

const Chat = ({ data, userProfile, socket, typingIds }) => {
  const [messages, setMessages] = useState([]);

  const { data: messagesHistory } = useMessages({
    from: prop("id")(userProfile),
    to: prop("id")(data),
  });

  useEffect(() => {
    if (isNotEmptyOrNil(messagesHistory)) {
      setMessages(messagesHistory);
    }
  }, [messagesHistory]);

  useEffect(() => {
    socket.on("message-sent", (message) => {
      setMessages((prev) => prepend(message, prev));
    });

    socket.on("message-received", (message) => {
      setMessages((prev) => prepend(message, prev));
      socket.emit("message-read", {
        from: prop("id")(data),
        to: prop("id")(userProfile),
      });
    });

    socket.on("message-delivered", (messagesIds) => {
      setMessages((prev) => updateMessages(prev, messagesIds));
    });

    socket.on("message-read", () => {
      setMessages((prev) => map((item) => ({ ...item, status: "READ" }))(prev));
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("message-read", {
      from: prop("id")(data),
      to: prop("id")(userProfile),
    });
  }, []);

  const messagesJSX = map((msg) => (
    <Message
      content={prop("content")(msg)}
      timestamp={prop("createdAt")(msg)}
      align={
        pipe(prop("from"), equals(prop("id")(data)))(msg) ? "left" : "right"
      }
      status={prop("status")(msg)}
      key={prop("id")(msg)}
    />
  ))(messages);

  return (
    <div className={styles["chat"]}>
      <ChatNavbar
        name={prop("name")(data)}
        typing={includes(prop("id")(data), pluck("id")(typingIds))}
      />
      <div className={styles["chat__content"]}>{messagesJSX}</div>
      <ChatFooter
        currentUserId={prop("id")(userProfile)}
        toId={prop("id")(data)}
      />
    </div>
  );
};

export default withSocket(Chat);
