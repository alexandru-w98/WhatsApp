import React, { useState, useRef, useEffect } from "react";
import * as styles from "./chat-main-page.css";
import ChatHistoryNavbar from "../../components/chat-history-navbar";
import ChatHistorySearch from "../../components/chat-history-search";
import ChatHistoryList from "../../components/chat-history-list";
import NoChatSelectedPlaceholder from "../../components/no-chat-selected-placeholder";
import Chat from "../../components/chat";
import withProtectedRoute from "../../hocs/withProtectedRoute";
import {
  pipe,
  isEmpty,
  not,
  prop,
  append,
  propEq,
  find,
  reject,
  map,
  when,
  assoc,
} from "ramda";
import useUserProfile from "../../hooks/requests/useUserProfile";
import withSocket from "../../hocs/withSocket";
import isNotEmptyOrNil from "../../utils/is-not-empty-or-nil";

const ChatMainPage = ({ socket }) => {
  const [selectedItem, setSelectedItem] = useState();
  const searchInputRef = useRef(null);
  const { data: userProfile } = useUserProfile();
  const [chatList, setChatList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [typingIds, setTypingIds] = useState([]);

  const onSearchInputChanged = (val) => {
    setSearchCriteria(val);
    if (pipe(isEmpty, not)(val)) {
      setChatList(prop("contacts")(userProfile));
    } else {
      setChatList([]);
    }
  };

  useEffect(() => {
    socket.on("message-received", (message) => {
      socket.emit("message-delivered", message);
    });

    socket.on("message-typing", ({ from }) => {
      setTypingIds((prev) => {
        const searchedId = find(propEq(from, "id"))(prev);
        const timer = setTimeout(() => {
          setTypingIds((prevItems) => reject(propEq(from, "id"))(prevItems));
        }, 1500);

        if (!searchedId) {
          return append({
            id: from,
            timer,
          })(prev);
        } else {
          return map(
            when(propEq(from, "id"), (item) => {
              pipe(prop("timer"), clearTimeout)(item);
              return assoc("timer", timer)(item);
            })
          )(prev);
        }
      });
    });
  }, [socket]);

  useEffect(() => {
    if (isNotEmptyOrNil(userProfile)) {
      socket.emit("message-delivered-all", {
        to: prop("id")(userProfile),
      });
    }
  }, [userProfile]);

  return (
    <div className={styles["chat"]}>
      <div className={styles["chat__content"]}>
        <div className={styles["chat__history"]}>
          <ChatHistoryNavbar />
          <ChatHistorySearch
            ref={searchInputRef}
            onChange={onSearchInputChanged}
          />
          <ChatHistoryList
            setSelectedItem={setSelectedItem}
            data={chatList}
            searchCriteria={searchCriteria}
          />
        </div>
        <div>
          {selectedItem ? (
            <Chat
              userProfile={userProfile}
              data={selectedItem}
              typingIds={typingIds}
            />
          ) : (
            <NoChatSelectedPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default pipe(withProtectedRoute, withSocket)(ChatMainPage);
