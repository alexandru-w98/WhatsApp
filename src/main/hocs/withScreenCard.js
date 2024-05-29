import React from "react";
import ScreenCard from "../components/screen-card";

const withScreenCard = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <ScreenCard>
        <Component {...props} />
      </ScreenCard>
    );
  };

  return WrappedComponent;
};

export default withScreenCard;
