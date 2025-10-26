import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";

const PostNewestItem = () => {
  return (
    <div className="flex gap-5">
      <div className="flex-2">
        <img
          className="h-[182px] rounded-3xl"
          src="https://cdn.prod.website-files.com/63bd2733c7e2f16bd005016f/668612aa6319bebdce85a785_Untitled%20design.zip%20-%20FullStack%20Web%20final%20project-3.jpeg"
          alt=""
        />
      </div>
      <div className="flex-3 flex flex-col gap-5 items-start">
        <PostCategory className={"bg-[#F3EDFF] text-[#636e72] inline-block"}>
          Kiến thức
        </PostCategory>
        <PostTitle className={"text-[#636e72] font-semibold text-xl"}>
          Hướng dẫn học lập trình cho người mới tại W3School
        </PostTitle>
        <PostMeta
          date={"Mar 18"}
          authorName={"Yến Tử"}
          className="text-black"
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewestItem;
