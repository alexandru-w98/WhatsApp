import React from "react";

const BurgerMenuWithOutline = ({ width = 24, height = 24 }) => {
  return (
    <svg height={height} viewBox="0 0 24 24" width={width}>
      <rect fill="#f2f2f2" height="24" rx="3" width="24"></rect>
      <path
        d="m12 15.5c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5-1.5-.675-1.5-1.5.675-1.5 1.5-1.5zm0-2c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zm0-5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z"
        fill="#818b90"
      ></path>
    </svg>
  );
};

export default BurgerMenuWithOutline;
