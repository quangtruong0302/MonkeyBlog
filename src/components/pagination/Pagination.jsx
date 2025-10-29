import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  // 👇 Hàm tạo danh sách số trang (có ... ở giữa)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // tối đa số trang hiển thị
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 select-none mt-8">
      {/* Nút Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm 
                   transition-colors ${
                     currentPage === 1
                       ? "text-gray-300 cursor-not-allowed"
                       : "text-gray-600 hover:bg-blue-600 hover:text-white"
                   }`}
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
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <li
              key={index}
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              ...
            </li>
          ) : (
            <li
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium cursor-pointer transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {page}
            </li>
          )
        )}
      </ul>

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm 
                   transition-colors ${
                     currentPage === totalPages
                       ? "text-gray-300 cursor-not-allowed"
                       : "text-gray-600 hover:bg-blue-600 hover:text-white"
                   }`}
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
