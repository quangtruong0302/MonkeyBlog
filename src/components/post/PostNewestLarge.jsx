import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import getLastName from "@utils/getLastName";

const PostNewestLarge = ({ data }) => {
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!data?.categoryId) return;

    const fetchCategory = async () => {
      try {
        const docRef = doc(db, "categories", data.categoryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCategory(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [data?.categoryId]);

  useEffect(() => {
    if (!data?.userId) return;

    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [data?.userId]);

  const formattedDate = data?.createdAt?.toDate
    ? data.createdAt.toDate().toLocaleDateString("vi-VI", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="shadow-lg p-5 rounded-3xl">
      <img
        className="rounded-3xl mb-5"
        alt={data?.title || "post image"}
        src={data?.imageUrl || ""}
      />
      <div className="flex flex-col gap-5 items-start">
        <PostCategory className={"bg-[#F3EDFF] text-[#636e72] inline-block"}>
          {category?.name || "Chưa có category"}
        </PostCategory>
        <PostTitle
          className={"text-[#636e72] font-semibold text-3xl"}
          slug={data && data.slug}
        >
          {data?.title || "Untitled"}
        </PostTitle>
        <PostMeta
          className={"text-black text-lg"}
          date={formattedDate}
          authorName={user?.fullname ? getLastName(user.fullname) : "Unknown"}
        />
      </div>
    </div>
  );
};

export default PostNewestLarge;
