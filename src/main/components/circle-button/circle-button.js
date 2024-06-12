import React from "react";
import * as styles from "./circle-button.module.css";
import classNames from "classnames";

const CircleButton = ({ children, className, ...rest }) => {
  const btnClasses = classNames(styles["button"], className);

  return (
    <button className={btnClasses} {...rest}>
      {children}
    </button>
  );
};

export default CircleButton;
