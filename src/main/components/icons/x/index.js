import React from "react";

const X = ({ width = 24, height = 24 }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={width}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>x-alt</title>
      <path
        fill="currentColor"
        d="M17.25,7.8L16.2,6.75l-4.2,4.2l-4.2-4.2L6.75,7.8l4.2,4.2l-4.2,4.2l1.05,1.05l4.2-4.2l4.2,4.2l1.05-1.05 l-4.2-4.2L17.25,7.8z"
      ></path>
    </svg>
  );
};

export default X;
