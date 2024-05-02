import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const withProtectedRoute = (Component) => {
  const WrappedComponent = (props) => {
    const location = useLocation().pathname;

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withProtectedRoute;
