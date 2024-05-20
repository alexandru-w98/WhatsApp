import React, { useRef } from "react";
import * as styles from "./pincode-input.module.css";
import { map, addIndex, pipe, join } from "ramda";
import NumericInput from "../numeric-input";
import noop from "../noop";

const mapIndexed = addIndex(map);

const PincodeInput = ({ pinLength = 4, onChange = noop }) => {
  const charRefArr = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const moveFocusCaret = (index) => () => {
    if (charRefArr[index].current.value.length && index < pinLength - 1) {
      charRefArr[index + 1].current.focus();
    }

    const computedValue = pipe(
      map((item) => item.current.value),
      join("")
    )(charRefArr);

    onChange(computedValue);
  };

  const onInputKeyDown = (index) => (e) => {
    if (
      e.code === "Backspace" &&
      charRefArr[index].current.value.length === 0 &&
      index > 0
    ) {
      charRefArr[index - 1].current.focus();
    }
  };

  const charListJSX = mapIndexed((item, index) => (
    <NumericInput
      className={styles["input__char"]}
      contentEditable
      ref={item}
      key={index}
      maxDigits={1}
      onChange={moveFocusCaret(index)}
      onKeyDown={onInputKeyDown(index)}
    />
  ))(charRefArr);

  return <div className={styles["input"]}>{charListJSX}</div>;
};

export default PincodeInput;
