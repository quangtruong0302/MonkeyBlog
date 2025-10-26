import React from "react";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import Button from "@components/button/Button";
import { Link } from "react-router-dom";

const PostManage = () => {
  return (
    <div>
      <DashboardHeading title="All posts"></DashboardHeading>
      <div className="flex items-center justify-between gap-5 my-10">
        <div className="">
          <Link to={"/manage/add-post"}>
            <Button>Add new post</Button>
          </Link>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg outline-none"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4 text-left">Id</th>
            <th className="px-6 py-4 text-left">Post</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Author</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">1</td>

            {/* Cột Post: Giới hạn chiều rộng + cho phép xuống dòng */}
            <td className="px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
              Đây là một bài viết có tiêu đề rất rất dài để kiểm tra xem bảng có
              tự động xuống dòng hay không, và tránh che các cột khác.
            </td>

            <td className="px-6 py-4 text-gray-500">Tin tức</td>
            <td className="px-6 py-4 text-gray-500">Nguyễn Văn A</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Published
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">1</td>

            {/* Cột Post: Giới hạn chiều rộng + cho phép xuống dòng */}
            <td className="px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
              Đây là một bài viết có tiêu đề rất rất dài để kiểm tra xem bảng có
              tự động xuống dòng hay không, và tránh che các cột khác.
            </td>

            <td className="px-6 py-4 text-gray-500">Tin tức</td>
            <td className="px-6 py-4 text-gray-500">Nguyễn Văn A</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Published
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">1</td>

            {/* Cột Post: Giới hạn chiều rộng + cho phép xuống dòng */}
            <td className="px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
              Đây là một bài viết có tiêu đề rất rất dài để kiểm tra xem bảng có
              tự động xuống dòng hay không, và tránh che các cột khác.
            </td>

            <td className="px-6 py-4 text-gray-500">Tin tức</td>
            <td className="px-6 py-4 text-gray-500">Nguyễn Văn A</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Published
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">1</td>

            {/* Cột Post: Giới hạn chiều rộng + cho phép xuống dòng */}
            <td className="px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
              Đây là một bài viết có tiêu đề rất rất dài để kiểm tra xem bảng có
              tự động xuống dòng hay không, và tránh che các cột khác.
            </td>

            <td className="px-6 py-4 text-gray-500">Tin tức</td>
            <td className="px-6 py-4 text-gray-500">Nguyễn Văn A</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Published
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 transition">
            <td className="px-6 py-4">1</td>

            {/* Cột Post: Giới hạn chiều rộng + cho phép xuống dòng */}
            <td className="px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
              Đây là một bài viết có tiêu đề rất rất dài để kiểm tra xem bảng có
              tự động xuống dòng hay không, và tránh che các cột khác.
            </td>

            <td className="px-6 py-4 text-gray-500">Tin tức</td>
            <td className="px-6 py-4 text-gray-500">Nguyễn Văn A</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Published
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline mr-3">
                Edit
              </button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="mt-10 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default PostManage;
