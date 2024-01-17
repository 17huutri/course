import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import {
  getCatalog,
  getCourses,
} from "../store/slices/courseSlice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Navigation2 from "../components/Navigation/Navigation2";
import Header from "../components/Header/Header";
import storageService from "../api/storageService";
import { getInstructor } from "../store/slices/instructorSlice";

function LandingPageLayout() {
  const dispatch = useDispatch();
  const role = storageService.getRole();
  const { isLogin } = useSelector((state) => state.accountReducer);
  const navigate = useNavigate();

  useEffect(() => {
    switch (role) {
      case "Admin":
        navigate("/admin");
        break;
      case "User":
        navigate("/");
        break;
      case "Instructor":
        navigate("/instructor");
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    //Top Courses GET
    dispatch(getCourses({ limit: 999, catalogIDs: null, courseSort: 0 }));
    dispatch(getCatalog());
    dispatch(getInstructor());
  }, []);

  return (
    <div className="w-full">
      {!isLogin ? <Header /> : <Navigation2 />}
      <div className="w-full">
        <Outlet />
      </div>
     
        <Footer />

      <div>
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </div>
  );
}

export default LandingPageLayout;
