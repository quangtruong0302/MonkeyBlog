import React, { useEffect, useState } from "react";
import Heading from "@components/layouts/Heading";
import PostNewestLarge from "@components/post/PostNewestLarge";
import PostNewestItem from "@components/post/PostNewestItem";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import { orderBy } from "lodash";
const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createAt", "desc"), limit(4));
        const querySnapshot = await getDocs(q);
        const latestPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(latestPosts);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container pt-10 sm:pt-12 lg:pt-15">
      <Heading className="text-[6vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2vw]">
        Newest
      </Heading>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 mt-5">
        <div className="flex-1">
          <PostNewestLarge data={posts[0]}></PostNewestLarge>
        </div>
        <div className="flex-1 flex flex-col gap-3 sm:gap-5 bg-gray-200 p-4 sm:p-5 rounded-3xl">
          {posts.length > 0 &&
            posts
              .slice(1)
              .map((post) => (
                <PostNewestItem key={post.id} data={post}></PostNewestItem>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNewest;
