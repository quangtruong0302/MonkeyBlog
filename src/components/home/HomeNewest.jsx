import React from "react";
import Heading from "@components/layouts/Heading";
import PostNewestLarge from "@components/post/PostNewestLarge";
import PostNewestItem from "@components/post/PostNewestItem";
const HomeNewest = () => {
  return (
    // <div className="container pt-15">
    //   <Heading>Newest</Heading>
    //   <div className="flex gap-10 mt-5">
    //     <div className="flex-1">
    //       <PostNewestLarge></PostNewestLarge>
    //     </div>
    //     <div className="flex-1 flex flex-col gap-5 bg-gray-200  p-5 rounded-3xl">
    //       <PostNewestItem></PostNewestItem>
    //       <PostNewestItem></PostNewestItem>
    //       <PostNewestItem></PostNewestItem>
    //     </div>
    //   </div>
    // </div>
    <div className="container pt-10 sm:pt-12 lg:pt-15">
      <Heading className="text-[6vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2vw]">
        Newest
      </Heading>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 mt-5">
        <div className="flex-1">
          <PostNewestLarge></PostNewestLarge>
        </div>
        <div className="flex-1 flex flex-col gap-3 sm:gap-5 bg-gray-200 p-4 sm:p-5 rounded-3xl">
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
          <PostNewestItem></PostNewestItem>
        </div>
      </div>
    </div>
  );
};

export default HomeNewest;
