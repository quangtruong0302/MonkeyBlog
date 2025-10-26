import Button from "@components/button/Button";
import React from "react";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary p-20">
      <div className="container flex justify-center items-center">
        <div className="flex-1 text-white flex flex-col gap-10">
          <h2 className="font-bold text-5xl">Monkey Bloging</h2>
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium totam atque architecto voluptates amet laudantium hic
            excepturi necessitatibus praesentium? Id facilis vero culpa
            laboriosam ut, doloremque tempore quaerat eius sapiente.
          </p>
          <Link to={"/sign-in"}>
            <button className="bg-white text-primary font-bold px-7 py-3 rounded-sm">
              {" "}
              Get started
            </button>
          </Link>
        </div>
        <div className="flex-1">
          <img src="/images/img-banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
