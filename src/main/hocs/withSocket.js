import React, { useContext } from "react";
import { SocketContext } from "../../context/socketContext";

const withSocket = (Component) => {
  const WrappedComponent = (props) => {
    const context = useContext(SocketContext);
    return <Component {...context} {...props} />;
  };

  return WrappedComponent;
};

export default withSocket;
