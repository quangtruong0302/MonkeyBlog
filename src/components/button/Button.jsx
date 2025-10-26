import React from "react";

const Button = ({ type = "Button", children, disabled, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`${
        disabled && "opacity-50"
      } bg-gradient-to-br from-primary to-secondary w-full text-white font-bold py-3 px-6 rounded-sm cursor-pointer flex justify-center items-center`}
    >
      {children}
    </button>
  );
};

export default Button;
