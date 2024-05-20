import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useVerifyJWT from "../hooks/useVerifyJWT";
import { isNil, prop, pipe } from "ramda";

const isNilOrFalse = (val) => isNil(val) || val === false;

const withProtectedRoute = (Component) => {
  const WrappedComponent = (props) => {
    const location = useLocation().pathname;
    const token = localStorage.getItem("authToken");

    const { data, loading, error } = useVerifyJWT({ token });

    // todo: loading spinner
    if (loading) {
      return <div>test</div>;
    }

    if (pipe(prop("valid"), isNilOrFalse)(data)) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withProtectedRoute;
