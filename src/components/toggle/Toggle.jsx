import React, { useState, useEffect } from "react";

const Toggle = ({ on: initialOn, onClick, ...rest }) => {
  const [toggle, setToggle] = useState(initialOn);
  useEffect(() => {
    setToggle(initialOn);
  }, [initialOn]);

  const handleClick = () => {
    const newValue = !toggle;
    setToggle(newValue);
    if (onClick) onClick(newValue);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={toggle}
        className="hidden"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[66px] h-[38px] relative cursor-pointer rounded-full p-1 transition-all ${
          toggle ? "bg-secondary" : "bg-gray-300"
        }`}
        onClick={handleClick}
        {...rest}
      >
        <span
          className={`transition-all w-[30px] h-[30px] bg-white rounded-full inline-block ${
            toggle ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
