import React from "react";

const Heading = ({ children }) => {
  return (
    <div className="border-t-3 border-t-secondary inline-block text-2xl font-bold pt-3 text-[#54a0ff]">
      {children}
    </div>
  );
};

export default Heading;
