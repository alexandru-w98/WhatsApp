import React, { forwardRef, useState } from "react";
import isNumericOrEmpty from "../rounded-input/isNumericOrEmpty";
import { isNil, length } from "ramda";
import noop from "../noop";

const NumericInput = ({ maxDigits, onChange = noop, ...rest }, ref) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChanged = (e) => {
    if (
      isNumericOrEmpty(e.target.value) &&
      (isNil(maxDigits) || length(e.target.value) <= maxDigits)
    ) {
      setInputValue(e.target.value);
      onChange(e.target.value);
    }
  };

  return (
    <input {...rest} value={inputValue} onChange={onInputChanged} ref={ref} />
  );
};

export default forwardRef(NumericInput);
