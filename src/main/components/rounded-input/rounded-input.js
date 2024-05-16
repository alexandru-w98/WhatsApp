import React, { forwardRef, useState } from "react";
import * as styles from "./rounded-input.module.css";
import classNames from "classnames";
import isNumericOrEmpty from "./isNumericOrEmpty";

const RoundedInput = ({ className, prefix, isNumeric }, ref) => {
  const containerClasses = classNames(styles["container"], className);
  const containerFocusedClasses = classNames(
    styles["container"],
    styles["container--focused"],
    className
  );

  const [containerStyles, setContainerStyles] = useState(containerClasses);
  const [inputValue, setInputValue] = useState("");

  const onInputFocused = () => {
    setContainerStyles(containerFocusedClasses);
  };

  const onInputBlurred = () => {
    setContainerStyles(containerClasses);
  };

  const onInputChanged = (e) => {
    if (isNumeric) {
      if (isNumericOrEmpty(e.target.value)) {
        setInputValue(e.target.value);
      }
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className={containerStyles} tabIndex={0}>
      <div contentEditable={false}>{prefix}</div>
      <input
        ref={ref}
        className={styles["input"]}
        onFocus={onInputFocused}
        onBlur={onInputBlurred}
        onChange={onInputChanged}
        value={inputValue}
      />
    </div>
  );
};

export default forwardRef(RoundedInput);
