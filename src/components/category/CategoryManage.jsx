import Delete from "@components/action/Delete";
import Edit from "@components/action/Edit";
import View from "@components/action/View";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import LabelStatus from "@components/label/LabelStatus";
import Table from "@components/table/Table";
import Button from "@components/button/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import React, { useState } from "react";
import { categoryStatus, userRole } from "@utils/constant";
import Pagination from "@components/pagination/Pagination";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import { useFirestorePagination } from "@hooks/useFirestorePagination";
import { db } from "@firebase-app/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import useAuth from "@contexts/useAuth";

const CategoryManage = () => {
  const [searchInput, setSearchInput] = useState("");
  const { userInfor } = useAuth();
  const {
    data: categories,
    loading,
    totalPages,
    currentPage,
    fetchPage,
  } = useFirestorePagination("categories", {
    pageSize: 8,
    orderField: "name",
    searchField: "name",
    searchValue: searchInput,
  });

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const colRef = doc(db, "categories", id);
        await deleteDoc(colRef);
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });
        fetchPage(currentPage);
      }
    });
  };

  const handleChangeSearchInput = debounce((e) => {
    setSearchInput(e.target.value);
  }, 500);

  if (userInfor.role !== userRole.ADMIN && userInfor.role !== userRole.MOD)
    return (
      <div className="flex justify-center items-center">
        <div className="text-center text-lg text-gray-500">
          You do not have permission to access this page.
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeading title="Categories"></DashboardHeading>
      <div className="flex items-center justify-between gap-5">
        <div>
          <Link to={"/manage/add-category"}>
            <Button>Add new category</Button>
          </Link>
        </div>
        <div className="w-full max-w-[600px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg outline-none"
            placeholder="Search category..."
            onChange={(e) => handleChangeSearchInput(e)}
          />
        </div>
      </div>

      <Table>
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-left">ID</td>
            <td className="whitespace-nowrap px-6 py-4 text-left">Name</td>
            <td className="whitespace-nowrap px-6 py-4 text-left">Slug</td>
            <td className="whitespace-nowrap px-6 py-4 text-left">
              Created At
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-left">Status</td>
            <td className="whitespace-nowrap px-6 py-4 text-left">Actions</td>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 min-h-[200px]">
          {loading ? (
            <tr>
              <td colSpan="5" whitespace-nowrap className="py-10">
                <div className="flex justify-center items-center">
                  <LoadingSpiner size="45px" borderSize="5px" />
                </div>
              </td>
            </tr>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <tr
                className="hover:bg-gray-50 transition cursor-pointer"
                key={category.id}
              >
                <td className="whitespace-nowrap px-6 py-4" title={category.id}>
                  {category.id.slice(0, 5) + "..."}
                </td>
                <td className="whitespace-nowrap px-6 py-4 max-w-xs break-words text-gray-900 font-medium">
                  {category.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {category.slug}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {category.createdAt &&
                    category.createdAt.toDate().toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {category.status === Number(categoryStatus.APPROVED) && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === Number(categoryStatus.UNAPPROVED) && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <View />
                    <Link to={`/manage/update-category/${category.id}`}>
                      <Edit />
                    </Link>
                    <Delete onClick={() => handleDeleteCategory(category.id)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                whitespace-nowrap
                className="text-center py-10 text-gray-500"
              >
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => fetchPage(page)}
      />
    </div>
  );
};

export default CategoryManage;
