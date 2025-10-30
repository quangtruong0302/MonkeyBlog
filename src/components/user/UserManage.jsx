import Button from "@components/button/Button";

import DashboardHeading from "@components/dashboard/DashboardHeading";
import React from "react";
import Table from "@components/table/Table";
import { useFirestorePagination } from "@hooks/useFirestorePagination";
import { userRole, userStatus } from "@utils/constant";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import LabelStatus from "@components/label/LabelStatus";
import View from "@components/action/View";
import Delete from "@components/action/Delete";
import Edit from "@components/action/Edit";
import { Link } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import Swal from "sweetalert2";
import Pagination from "@components/pagination/Pagination";
import useAuth from "@contexts/useAuth";

const UserManage = () => {
  const { userInfor } = useAuth();
  const {
    data: users,
    loading,
    totalPages,
    currentPage,
    fetchPage,
    refresh,
  } = useFirestorePagination("users", {
    pageSize: 5,
    orderField: "fullname",
    searchField: "fullname",
  });
  const handleDeleteUser = async (user) => {
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
        const colRef = doc(db, "users", user.id);
        await deleteDoc(colRef);
        await deleteUser;
        await deleteDoc(colRef);
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });
        await refresh();
      }
    });
  };

  if (Number(userInfor.role) !== userRole.ADMIN) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center text-lg text-gray-500">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeading
        title="Users"
        desc="Manage your users"
      ></DashboardHeading>
      <div className="w-[250px]">
        <Link to={"/manage/add-user"}>
          <Button type="submit">Add new user</Button>
        </Link>
      </div>
      <Table>
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <td className="whitespace-normal px-6 py-4 text-left">ID</td>
            <td className="whitespace-normal px-6 py-4 text-left">
              Information
            </td>
            <td className="whitespace-normal px-6 py-4 text-left">User name</td>
            <td className="whitespace-normal px-6 py-4 text-left">
              Email address
            </td>
            <td className="whitespace-normal px-6 py-4 text-left">Status</td>
            <td className="whitespace-normal px-6 py-4 text-left">Role</td>
            <td className="whitespace-normal px-6 py-4 text-left">Actions</td>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 min-h-[200px]">
          {loading ? (
            <tr>
              <td colSpan="5" whitespace-normal className="py-10">
                <div className="flex justify-center items-center">
                  <LoadingSpiner size="45px" borderSize="5px" />
                </div>
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr
                className="hover:bg-gray-50 transition cursor-pointer"
                key={user.id}
              >
                <td className="whitespace-normal px-6 py-4" title={user.id}>
                  {user.id.slice(0, 5) + "..."}
                </td>
                <td className="whitespace-normal px-6 py-4 max-w-xs break-words text-gray-900 font-medium flex items-center gap-5">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                      src={user.avatar}
                      className="w-full h-full object-cover rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>{user.fullname}</span>
                    <span className="text-gray-400">
                      CreatedAt:{" "}
                      {user.createdAt.toDate().toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </td>
                <td className="whitespace-normal px-6 py-4 text-gray-500">
                  {user.username}
                </td>
                <td className="whitespace-normal px-6 py-4 text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-normal px-6 py-4">
                  {user.status === Number(userStatus.ACTIVE) && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )}
                  {user.status === Number(userStatus.PENDING) && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {user.status === Number(userStatus.BAN) && (
                    <LabelStatus type="danger">Banned</LabelStatus>
                  )}
                </td>
                <td className="whitespace-normal px-6 py-4">
                  {user.role === Number(userRole.ADMIN) && <span>Admin</span>}
                  {user.role === Number(userRole.MOD) && <span>Moderator</span>}
                  {user.role === Number(userRole.USER) && <span>User</span>}
                </td>
                <td className="whitespace-normal px-6 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <View />
                    <Link to={`/manage/update-user/${user.id}`}>
                      <Edit />
                    </Link>
                    <Delete onClick={() => handleDeleteUser(user)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                whitespace-normal
                className="text-center py-10 text-gray-500"
              >
                No users found
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

export default UserManage;
