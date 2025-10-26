import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Nút Prev */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm 
                   text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Danh sách trang */}
      <ul className="flex items-center gap-2">
        <li
          className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-gray-700
                     hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          1
        </li>
        <li
          className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-white
                     bg-blue-600 cursor-pointer"
        >
          2
        </li>
        <li className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">
          ...
        </li>
        <li
          className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-gray-700
                     hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          3
        </li>
        <li
          className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-gray-700
                     hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          4
        </li>
        <li
          className="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-gray-700
                     hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          5
        </li>
      </ul>

      {/* Nút Next */}
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm 
                   text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
