import React from "react";
import Navigation from "../components/Navigation/Navigation";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    console.log(isAllowed);
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    children
  ) : (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 h-screen">
        <Navigation />
      </div>
      <div className="col-span-10 h-screen ">
      <Outlet />
      </div>
    </div>

  );
};

export default MainLayout;
