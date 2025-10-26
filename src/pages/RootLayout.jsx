import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </Fragment>
  );
};

export default RootLayout;
