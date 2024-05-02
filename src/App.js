import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./main/screens/login-qr";
import "./App.css";
import Chat from "./main/screens/chat-main-page";
import socketIO from "socket.io-client";
import { SocketContext } from "./context/socketContext";
import VerifyNumber from "./main/screens/verify-number";

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
    path: "verify-number/:socketId",
    element: <VerifyNumber />,
  },
]);

const App = () => {
  const context = {
    socket,
  };

  return (
    <SocketContext.Provider value={context}>
      <RouterProvider router={router} />
    </SocketContext.Provider>
  );
};

export default App;
