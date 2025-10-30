import React from "react";
import { Link } from "react-router-dom";

const PostTitle = ({ children, className, slug = "" }) => {
  return (
    <Link to={`/post/${slug}`}>
      <h3 className={className}>{children}</h3>
    </Link>
  );
};

export default PostTitle;
