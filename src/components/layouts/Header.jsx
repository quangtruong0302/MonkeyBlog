import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/button/Button";
import useAuth from "@contexts/useAuth";
import { Link } from "react-router-dom";

import getLastName from "@utils/getLastName";

const MENU_ITEMS = [
  {
    id: "home",
    url: "/",
    title: "Home",
  },
  {
    id: "blog",
    url: "/blog",
    title: "Blog",
  },
  {
    id: "contact",
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  const { userInfor } = useAuth();
  return (
    <header className="py-5 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center justify-between gap-10">
          <a href="/">
            <img src="/images/logo.png" alt="" className="w-10" />
          </a>
          <ul className="flex items-center justify-center gap-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="block py-3 px-5 rounded-sm hover:text-white hover:bg-primary transition-all font-semibold"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="w-[500px]">
            <div className="border border-gray-300 rounded-sm px-4 py-3 flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search post..."
                className="outline-none w-full"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500"
              />
            </div>
          </div>

          <div>
            {!userInfor ? (
              <div className="flex gap-3">
                <Link to={"/sign-in"}>
                  <Button>Sign in</Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button>Sign up</Button>
                </Link>
              </div>
            ) : (
              <div className="">
                <span>Welcome back, </span>
                <strong className="text-primary">
                  {getLastName(userInfor?.displayName || "")}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
