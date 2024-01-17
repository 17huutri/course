import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  // console.log(isAllowed, redirectPath, children);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
