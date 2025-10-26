import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const PostMeta = ({ date, authorName, className = "text-white" }) => {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div>{date}</div>
      <FontAwesomeIcon icon={faCircle} className="text-[8px]" />

      <div>{authorName}</div>
    </div>
  );
};

export default PostMeta;
