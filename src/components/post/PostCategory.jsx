import React from "react";
import { Link } from "react-router-dom";

const PostCategory = ({ className, children, to }) => {
  const newClassName = `p-3 text-center rounded-lg font-semibold ${className}`;
  return (
    <Link to={to}>
      <div className={newClassName}>{children}</div>;
    </Link>
  );
};

export default PostCategory;
