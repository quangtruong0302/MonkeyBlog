import React, { Fragment } from "react";
import { useController } from "react-hook-form";

const Input = ({ control, name, children, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        className={`w-full h-11 ${
          children ? "py-2 pl-3 pr-11" : "px-3 py-2"
        } border border-gray-200 rounded-sm focus:outline-none focus:border-primary`}
        {...field}
        {...props}
      />
      {children && (
        <div className="absolute right-3 top-1/2 translate -translate-y-1/2 text-primary">
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
