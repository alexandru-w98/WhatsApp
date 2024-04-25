import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginQR from "./login/screens/login-qr";
import LoginPhoneNumber from "./login/screens/login-phone-number";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginQR />,
  },
  {
    path: "login-phone-number",
    element: <LoginPhoneNumber />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
