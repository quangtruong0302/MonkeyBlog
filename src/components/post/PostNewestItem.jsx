import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import getLastName from "@utils/getLastName";

const PostNewestItem = ({ data }) => {
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchCategory = async () => {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    };
    fetchCategory();
  }, [data.categoryId]);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", data.userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    };
    fetchUser();
  }, [data.userId]);
  const createdAt = data.createdAt?.toDate();
  const formattedDate = createdAt
    ? createdAt.toLocaleDateString("vi-VI", { month: "short", day: "numeric" })
    : "";

  return (
    <div className="flex gap-5">
      <div className="flex-2">
        <img
          className="h-[182px] rounded-3xl w-full"
          src={data?.imageUrl || ""}
          alt=""
        />
      </div>
      <div className="flex-3 flex flex-col gap-5 items-start">
        <PostCategory className={"bg-[#F3EDFF] text-[#636e72] inline-block"}>
          {category?.name}
        </PostCategory>
        <PostTitle className={"text-[#636e72] font-semibold text-xl"}>
          {data?.title}
        </PostTitle>
        <PostMeta
          date={formattedDate}
          authorName={getLastName(user?.fullname)}
          className="text-black"
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewestItem;
