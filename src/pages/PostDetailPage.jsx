import React, { useEffect, useState } from "react";
import Heading from "@components/layouts/Heading";
import PostCategory from "@components/post/PostCategory";
import PostFeatureItem from "@components/post/PostFeatureItem";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import NotFoundPage from "./NotFoundPage";
import PostTitle from "@components/post/PostTitle";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [relatedPost, setRelatedPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(5)
    );
    let results = [];
    onSnapshot(queries, (snapshot) => {
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRelatedPost(results);
    });
  }, [postInfo.categoryId]);

  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      const docRef = doc(db, "categories", postInfo.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    };
    fetchCategory();
  }, [postInfo.categoryId]);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", postInfo.userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    };
    fetchUser();
  }, [postInfo.userId]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo.title) return null;
  return (
    <section className="container py-20 flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <PostTitle className="text-5xl font-semibold leading-normal">
          {postInfo.title}
        </PostTitle>
        <div className="flex gap-5 items-center text-gray-400">
          <div>
            CreatedAt:{" "}
            {postInfo.createdAt
              ? postInfo.createdAt.toDate().toLocaleString("vi-VN")
              : "Unknow"}
          </div>
          <div className="border border-gray-400 h-4"></div>
          <div>
            UpdatedAt:{" "}
            {postInfo.updatedAt
              ? postInfo.updatedAt.toDate().toLocaleString("vi-VN")
              : "Unknow"}
          </div>
          <div className="border border-gray-400 h-4"></div>
          <div>
            Category:{" "}
            {postInfo.categoryId && category ? category.name : "Unknow"}
          </div>
          <div className="border border-gray-400 h-4"></div>
          <div>
            Author: {postInfo.userId && user ? user.fullname : "Unknow"}
          </div>
        </div>
      </div>
      <div className="rounded-lg">
        <img
          className="w-full object-cover rounded-lg"
          src={postInfo.imageUrl}
          alt=""
        />
      </div>
      <div className="flex gap-10">
        <div className="bg-gray-100 rounded-lg flex-2 flex flex-col gap-5 p-5">
          <Heading className="text-[6vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2vw] ">
            Related articles
          </Heading>
          <div className="flex flex-col gap-5">
            {relatedPost.length > 0 &&
              relatedPost.map((r) => (
                <PostFeatureItem
                  data={r}
                  className="!h-[250px]"
                  text="!text-xl"
                ></PostFeatureItem>
              ))}
          </div>
        </div>
        <div className="flex-5">
          {postInfo.content ? (
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{
                __html: postInfo.content || "",
              }}
            ></div>
          ) : (
            <div className="text-center p-10 text-gray-600">
              Oops! It looks like this article doesn’t have content yet — coming
              soon!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostDetailPage;
