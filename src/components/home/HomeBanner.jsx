import Button from "@components/button/Button";
import React from "react";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary p-10 sm:p-16 lg:p-20">
      <div className="container flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1 text-white flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <h2 className="font-bold text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw]">
            Monkey Bloging
          </h2>
          <p className="text-[4vw] sm:text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium totam atque architecto voluptates amet laudantium hic
            excepturi necessitatibus praesentium? Id facilis vero culpa
            laboriosam ut, doloremque tempore quaerat eius sapiente.
          </p>
          <Link to={"/sign-in"}>
            <button className="bg-white text-primary font-bold px-5 sm:px-7 py-2 sm:py-3 rounded-sm text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw]">
              Get started
            </button>
          </Link>
        </div>
        <div className="flex-1 mt-6 lg:mt-0">
          <img src="/images/img-banner.png" alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
