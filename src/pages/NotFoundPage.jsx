import Button from "@components/button/Button";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 max-w-[500px] w-full mx-auto">
      <div className="text-8xl font-bold">404</div>
      <img src="/images/404.png" alt="" className="w-[350px]" />
      <p className="font-bold text-lg">Page not found</p>
      <p className="text-center">
        Sorry, the page you are looking for cannot be found. Please check the
        URL or try navigating back to the homepage.
      </p>
      <div className="max-w-[250px]">
        <Button>
          <Link to={"/"}>
            <div className="flex items-center justify-between gap-2">
              <p>Go back to home</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
