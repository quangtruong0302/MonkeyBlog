import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import useAuth from "@contexts/useAuth";
import NotFoundPage from "@pages/NotFoundPage";

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
    <div className="max-w-[1600px] mx-auto">
      <DashboardHeader />
      <div className="flex gap-10">
        <Sidebar />
        <div className="w-full py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
