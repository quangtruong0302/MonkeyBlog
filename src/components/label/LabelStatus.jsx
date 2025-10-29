import React from "react";

const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassName = "bg-green-100 text-green-700";
      break;
    case "warning":
      styleClassName = "bg-yellow-100 text-yellow-700";
      break;
    case "danger":
      styleClassName = "bg-red-100 text-red-700";
      break;
    default:
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-2 rounded-sm text-xs font-medium ${styleClassName}`}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
