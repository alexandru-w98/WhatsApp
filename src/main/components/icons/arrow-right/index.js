import React from "react";

const ArrowRight = ({ width = 28, height = 34, color = "#FFF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 34"
    >
      <path
        fill={color}
        d="M1 4.983v24.034a2.982 2.982 0 0 0 4.564 2.53L24.792 19.53a2.981 2.981 0 0 0 0-5.058L5.563 2.454A2.983 2.983 0 0 0 1 4.983z"
      ></path>
    </svg>
  );
};

export default ArrowRight;
