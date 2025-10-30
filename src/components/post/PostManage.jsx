import React, { useEffect, useState } from "react";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import Table from "@components/table/Table";
import View from "@components/action/View";
import Delete from "@components/action/Delete";
import Edit from "@components/action/Edit";
import Pagination from "@components/pagination/Pagination";
import Button from "@components/button/Button";
import { Link } from "react-router-dom";
import { useFirestorePagination } from "@hooks/useFirestorePagination";
import { debounce } from "lodash";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import LabelStatus from "@components/label/LabelStatus";
import { postStatus } from "@utils/constant";
import Toggle from "@components/toggle/Toggle";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PostManage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryMap, setCategoryMap] = useState({});
  const [userMap, setUserMap] = useState({});

  const {
    data: posts,
    loading,
    totalPages,
    currentPage,
    fetchPage,
  } = useFirestorePagination("posts", {
    pageSize: 4,
    orderField: "title",
    searchField: "title",
    searchValue: searchInput,
  });

  const handleChangeSearchInput = debounce((e) => {
    setSearchInput(e.target.value);
  }, 500);

  const fetchCategory = async (id) => {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const fetchUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  useEffect(() => {
    const fetchExtraData = async () => {
      if (!posts || posts.length === 0) return;
      const newCategoryMap = { ...categoryMap };
      const newUserMap = { ...userMap };
      for (const post of posts) {
        if (post.categoryId && !newCategoryMap[post.categoryId]) {
          const cat = await fetchCategory(post.categoryId);
          newCategoryMap[post.categoryId] = cat?.name || "Unknown";
        }
        if (post.userId && !newUserMap[post.userId]) {
          const user = await fetchUser(post.userId);
          newUserMap[post.userId] = user?.fullname || "Unknown";
        }
      }
      setCategoryMap(newCategoryMap);
      setUserMap(newUserMap);
    };

    fetchExtraData();
  }, [posts]);
  const handleDeletePost = async (id) => {
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
        const colRef = doc(db, "posts", id);
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

  const handleChangeHot = async (id, post) => {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...post,
      hot: !post?.hot,
    });

    toast.success("Post updated successfully!");
  };

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeading title="All posts" desc="Manage all posts" />
      <div className="flex items-center justify-between gap-5">
        <Link to="/manage/add-post">
          <Button>Add new post</Button>
        </Link>

        <div className="w-full max-w-[600px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg outline-none"
            placeholder="Search post..."
            onChange={(e) => handleChangeSearchInput(e)}
          />
        </div>
      </div>

      <Table>
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th className="px-5 py-3 text-left">Id</th>
            <th className="px-5 py-3 text-left">Post</th>
            <th className="px-5 py-3 text-left">Category</th>
            <th className="px-5 py-3 text-left">Author</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Feature</th>
            <th className="px-5 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan="6" className="py-10 text-center">
                <LoadingSpiner size="45px" borderSize="5px" />
              </td>
            </tr>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3" title={post.id}>
                  {post.id.slice(0, 5)}...
                </td>

                <td className="px-5 py-3 text-gray-900 font-medium flex items-center gap-3">
                  <div className="w-28 rounded-sm">
                    <img
                      src={post.imageUrl && post.imageUrl}
                      alt=""
                      className="w-full h-auto rounded-sm"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="">{post.title}</div>
                    <div className="text-xs text-gray-500 flex gap-3 items-center justify-start">
                      <div>
                        CreatedAt:{" "}
                        {post.createdAt.toDate().toLocaleString("vi-VN")}
                      </div>
                      <div className="h-3 border "></div>
                      <div>
                        UpdatedAt:{" "}
                        {post.updatedAt.toDate().toLocaleString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3 text-gray-500">
                  {categoryMap[post.categoryId] || "Loading..."}
                </td>
                <td className="px-5 py-3 text-gray-500">
                  {userMap[post.userId] || "Loading..."}
                </td>

                <td className="px-5 py-3">
                  {post.status === Number(postStatus.APPROVED) && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {post.status === Number(postStatus.PENDING) && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {post.status === Number(postStatus.REJECT) && (
                    <LabelStatus type="danger">Reject</LabelStatus>
                  )}
                </td>
                <td className="px-5 py-3 text-gray-500">
                  <Toggle
                    on={post.hot}
                    onClick={() => handleChangeHot(post.id, post)}
                  ></Toggle>
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Link to={`/post/${post.slug}`}>
                      <View />
                    </Link>
                    <Link to={`/manage/update-post/${post.id}`}>
                      <Edit />
                    </Link>
                    <Delete onClick={() => handleDeletePost(post.id, post)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-500">
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="mt-10 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => fetchPage(page)}
        />
      </div>
    </div>
  );
};

export default PostManage;
