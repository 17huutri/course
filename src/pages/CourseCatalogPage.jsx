import React, { useEffect } from "react";
import CourseCatalogNav from "../components/CourseCatalog/CourseCatalogNav";
import Header from "../components/Header/Header";
import ImageSlider from "../components/CourseCatalog/ImageSlider";
import CourseCatalog from "../components/CourseCatalog/CourseCatalog";
import { useDispatch } from "react-redux";
import { fetchCoursesByPage } from "../store/slices/courseSlice/courseSlice";
export default function CourseCatalogPage() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     fetchCoursesByPage({ limit: 100, catalogIDs: null, courseSort: 0 })
  //   );
  // }, [dispatch]);

  return (
    <div className="relative">
      <ImageSlider />
      <CourseCatalog />
    </div>
  );
}
