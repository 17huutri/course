import React, { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";
import SidebarAdmin from "../components/Navigation/SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/slices/adminSlice";
import { getCatalog } from "../store/slices/adminSlice";

const AdminLayout = ({ isAllowed, redirectPath = "/", children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatalog());
    dispatch(getUsers());
  }, []);

  if (!isAllowed) {
    console.log(isAllowed);
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    children
  ) : (
    <div className="w-full h-screen  relative flex">
      <SidebarAdmin />

      <Outlet />
    </div>
  );
};

export default AdminLayout;
