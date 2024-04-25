import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./login/screens/login-qr";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginQR />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
