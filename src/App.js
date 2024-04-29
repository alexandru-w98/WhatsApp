import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./login/screens/login-qr";
import "./App.css";
import Chat from "./login/screens/chat";

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
