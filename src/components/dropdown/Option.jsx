import React from "react";
import useDropdown from "./useDropdown";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-2 px-3 cursor-pointer flex items-center justify-between hover:text-primary hover:bg-gray-100 transition-all text-sm"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
