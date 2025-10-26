// import React from "react";

// const Table = ({ children }) => {
//   return (
//     <div className="overflow-x-auto bg-white rounded-lg">
//       <table className="w-full">
//         <thead className="bg-[#f7f7f8]">
//           {/* Bạn có thể truyền <tr><th>...</th></tr> từ ngoài vào */}
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-sm text-gray-700">{children}</table>
    </div>
  );
};

export default Table;
