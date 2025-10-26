import Button from "@components/button/Button";
// import useAuth from "@contexts/useAuth";
import React from "react";
import { Link, Links, NavLink } from "react-router-dom";

const DashboardHeader = () => {
  // const { userInfo } = useAuth();

  return (
    <div className="bg-white p-5 border-b border-gray-200 flex justify-between gap-5">
      <NavLink
        to="/"
        className="flex items-center justify-center gap-5 text-lg font-semibold"
      >
        <img
          srcSet="/images/logo.png 2x"
          alt="monkey-blogging"
          className="max-w-[40px]"
        />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>
      <div className="flex items-center gap-5">
        <Link to="/manage/add-post">
          <Button className="h-[52px]">Write new post</Button>
        </Link>
        <Link to="/profile" className="w-[52px] h-[52px]">
          <img
            src={"/images/man.png"}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
