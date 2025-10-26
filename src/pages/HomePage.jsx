import HomeBanner from "@components/home/HomeBanner";
import HomeFeature from "@components/home/HomeFeature";
import HomeNewest from "@components/home/HomeNewest";

import React, { Fragment } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </Fragment>
  );
};

export default HomePage;
