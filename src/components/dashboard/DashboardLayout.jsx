import React, { useState, useEffect, Fragment } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import useAuth from "@contexts/useAuth";
import NotFoundPage from "@pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const { userInfor } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userInfor !== undefined) {
      setLoading(false);
    }
  }, [userInfor]);

  if (loading) {
    return;
  }

  if (!userInfor) {
    return <NotFoundPage />;
  }

  return (
    <Fragment>
      <div className="max-w-[1600px] mx-auto">
        {/* <ToastContainer></ToastContainer> */}
        <DashboardHeader />
      </div>
      <div className="flex gap-5">
        <Sidebar />
        <div className="w-full py-5">
          <div className="pr-5">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
