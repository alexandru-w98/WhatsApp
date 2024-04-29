import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./main/screens/login-qr";
import "./App.css";
import Chat from "./main/screens/chat-main-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginQR />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
