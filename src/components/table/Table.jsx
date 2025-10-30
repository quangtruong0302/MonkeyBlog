import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-sm text-gray-700">{children}</table>
    </div>
  );
};

export default Table;
