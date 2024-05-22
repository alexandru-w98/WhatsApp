import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./main/screens/login-qr";
import "./App.css";
import Chat from "./main/screens/chat-main-page";
import socketIO from "socket.io-client";
import { SocketContext } from "./context/socketContext";
import VerifyNumber from "./main/screens/verify-number";
import { getCookieValue } from "./main/utils/cookie";

const socket = socketIO.connect("http://localhost:4000");
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginQR />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
  {
    path: "verify-number",
    element: <VerifyNumber />,
  },
]);

const App = () => {
  const context = {
    socket,
  };

  useEffect(() => {
    //
    socket.emit("update-socketId", {
      token: getCookieValue("authToken"),
    });
  }, []);

  return (
    <SocketContext.Provider value={context}>
      <RouterProvider router={router} />
    </SocketContext.Provider>
  );
};

export default App;
