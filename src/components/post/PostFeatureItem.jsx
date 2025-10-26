import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";

import getLastName from "@utils/getLastName";

const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
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
    ? createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

  console.log(data);
  return (
    <div className="relative rounded-lg border border-gray-200 boxShadow h-[333px] select-none">
      <img
        className="rounded-lg w-full h-full"
        src={data.imageUrl}
        alt="hinh-anh"
      />
      <div className="bg-black opacity-50 absolute inset-0 rounded-lg"></div>
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-10">
          <PostCategory
            className={"bg-[#F3EDFF] text-[#636e72]"}
            to={category.slug}
          >
            {category.name}
          </PostCategory>
          <PostMeta
            date={formattedDate}
            authorName={getLastName(user.fullname)}
          ></PostMeta>
        </div>
        <PostTitle className={"text-white text-2xl"}>{data.title}</PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
