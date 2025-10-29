import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="text-secondary text-4xl">
      <div>
        <h1 className="font-semibold">{title}</h1>
        <p className="text-sm text-gray-400 italic">{desc}</p>
      </div>
      {children}
    </div>
  );
};
export default DashboardHeading;
