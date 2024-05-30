import React from "react";
import { pipe, split } from "ramda";

const joinByJsx = (jsx) => (arr) => {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);

    if (i != arr.length - 1) {
      newArr.push(jsx);
    }
  }

  return newArr;
};

const getHighlightedText = (str, searchCriteria, className) => {
  const matchedJsx = <span className={className}>{searchCriteria}</span>;

  const test = pipe(split(searchCriteria), joinByJsx(matchedJsx))(str);
  return test;
};

export default getHighlightedText;
