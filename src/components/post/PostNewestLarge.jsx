import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";

const PostNewestLarge = () => {
  return (
    <div className="shadow-lg p-5 rounded-3xl">
      <img
        className="rounded-3xl mb-5"
        alt=""
        src="https://cdn.prod.website-files.com/63bd2733c7e2f16bd005016f/668612aa6319bebdce85a785_Untitled%20design.zip%20-%20FullStack%20Web%20final%20project-3.jpeg"
      />
      <div className="flex flex-col gap-5 items-start">
        <PostCategory className={"bg-[#F3EDFF] text-[#636e72] inline-block"}>
          Kiến thức
        </PostCategory>
        <PostTitle className={"text-[#636e72] font-semibold text-3xl"}>
          Hướng dẫn học lập trình cho người mới tại W3School
        </PostTitle>
        <PostMeta
          className={"text-black text-lg"}
          date={"Mar 21"}
          authorName={"Yến Tử"}
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewestLarge;
