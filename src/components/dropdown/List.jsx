import React from "react";
import useDropdown from "./useDropdown";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm rounded-sm">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
