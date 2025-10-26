import React from "react";

const LoadingSpiner = ({ size = "40px", borderSize = "3px" }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: borderSize,
      }}
      className={` border-white rounded-full animate-spin border-t-transparent border-b-transparent`}
    ></div>
  );
};

export default LoadingSpiner;
