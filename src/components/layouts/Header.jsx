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
    // <header className="py-5 shadow-md">
    //   <div className="container flex items-center justify-between">
    //     <div className="flex items-center justify-between gap-10">
    //       <a href="/">
    //         <img src="/images/logo.png" alt="" className="w-10" />
    //       </a>
    //       <ul className="flex items-center justify-center gap-1">
    //         {MENU_ITEMS.map((item) => (
    //           <li key={item.id}>
    //             <a
    //               href={item.url}
    //               className="block py-3 px-5 rounded-sm hover:text-white hover:bg-primary transition-all font-semibold"
    //             >
    //               {item.title}
    //             </a>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="flex items-center justify-between gap-5">
    //       <div className="w-[500px]">
    //         <div className="border border-gray-300 rounded-sm px-4 py-3 flex items-center justify-between gap-4">
    //           <input
    //             type="text"
    //             placeholder="Search post..."
    //             className="outline-none w-full"
    //           />
    //           <FontAwesomeIcon
    //             icon={faMagnifyingGlass}
    //             className="text-gray-500"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         {!userInfor ? (
    //           <div className="flex gap-3">
    //             <Link to={"/sign-in"}>
    //               <Button>Sign in</Button>
    //             </Link>
    //             <Link to={"/sign-up"}>
    //               <Button>Sign up</Button>
    //             </Link>
    //           </div>
    //         ) : (
    //           <div className="">
    //             <span>Welcome back, </span>
    //             <strong className="text-primary">
    //               {getLastName(userInfor?.displayName || "")}
    //             </strong>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </header>
    <header className="py-4 sm:py-5 shadow-md">
      <div className="container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
        {/* Logo và Menu */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto">
          <a href="/">
            <img src="/images/logo.png" alt="" className="w-12 sm:w-10" />
          </a>
          <ul className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-2 lg:gap-3 text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw] font-semibold">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="block py-2 lg:py-3 px-3 lg:px-5 rounded-sm hover:text-white hover:bg-primary transition-all"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Search + Auth */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-3 lg:gap-5 w-full lg:w-auto">
          <div className="w-full lg:w-[500px]">
            <div className="border border-gray-300 rounded-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Search post..."
                className="outline-none w-full text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw]"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-500 text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw]">
            {!userInfor ? (
              <>
                <Link to={"/sign-in"}>
                  <Button className="text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw]">
                    Sign in
                  </Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button className="text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.2vw]">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div>
                <span>Welcome back, </span>
                <strong className="text-primary">
                  {getLastName(userInfor?.displayName || "")}
                </strong>

                <Link to={"/dashboard"}>
                  <span className="ml-5 hover:underline hover:text-secondary">
                    Go to Dashboard
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
