import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useVerifyJWT from "../hooks/requests/useVerifyJWT";
import { isNil, prop, pipe, not } from "ramda";
import Loading from "../components/loading";

const isNilOrFalse = (val) => isNil(val) || val === false;

const withRedirectIfLogged = (Component) => {
  const WrappedComponent = (props) => {
    const location = useLocation().pathname;

    const { data, loading } = useVerifyJWT();

    if (loading) {
      return <Loading />;
    }

    if (pipe(prop("valid"), isNilOrFalse, not)(data)) {
      return <Navigate to="/chat" replace state={{ from: location }} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withRedirectIfLogged;
