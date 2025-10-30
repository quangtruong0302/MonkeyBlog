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
      limit(6)
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
    <div className="container pt-10 sm:pt-12 lg:pt-15">
      <Heading className="text-[6vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2vw]">
        Featured article
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-5">
        {posts.map((post) => (
          <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
        ))}
      </div>
    </div>
  );
};

export default HomeFeature;
