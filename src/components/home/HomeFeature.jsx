import Heading from "@components/layouts/Heading";
import React, { useEffect, useState } from "react";
import PostFeatureItem from "../post/PostFeatureItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
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
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return;

  return (
    <div className="container pt-15">
      <Heading>Featured article</Heading>
      <div className="grid grid-cols-3 gap-10 mt-5">
        {posts.map((post) => (
          <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
        ))}
        {/* <PostFeatureItem></PostFeatureItem>
        <PostFeatureItem></PostFeatureItem>
        <PostFeatureItem></PostFeatureItem> */}
      </div>
    </div>
  );
};

export default HomeFeature;
