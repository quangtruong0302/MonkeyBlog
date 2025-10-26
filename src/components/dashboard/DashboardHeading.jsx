import React from "react";

const DashboardHeading = ({ title = "", children }) => {
  return (
    <div className="text-secondary font-bold text-3xl">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
