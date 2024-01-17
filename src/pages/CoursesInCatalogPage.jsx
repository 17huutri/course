import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCoursesNew,
  getCoursesOfCatalog,
  getCoursesPopular,
  getCoursesRate,
} from "../store/slices/courseSlice/courseSlice";
import ReusableTitle from "../components/CourseCatalog/CoursesInCatalogPage/ReusableTitle";
import CoursesSuggest from "../components/CourseCatalog/CoursesInCatalogPage/CoursesSuggest";
import CoursesAllCatalog from "../components/CourseCatalog/CoursesInCatalogPage/CoursesAllCatalog";

export default function CoursesInCatalogPage() {
  const dispatch = useDispatch();
  const { catlName } = useParams();
  const { catalog } = useSelector((state) => state.courseReducer);
  const decodeCatlName = catlName.replace(/-/g, " ").trim();
  const catalogPage = catalog?.find((item) => item.name === decodeCatlName);
  useEffect(() => {
    dispatch(getCoursesOfCatalog({ catalogIDs: catalogPage?.id }));
    dispatch(getCoursesPopular({ catalogIDs: catalogPage?.id }));
    dispatch(getCoursesNew({ catalogIDs: catalogPage?.id, courseSort: 3 }));
    dispatch(getCoursesRate({ catalogIDs: catalogPage?.id }));
  }, [dispatch, catalogPage]);

  return (
    <div className="md:px-[5%] px-[10%] 2xl:px-[10%] py-[40px]">
      <h1 className="text-[28px] font-semibold pb-[30px]">
        {catalogPage?.name}
      </h1>
      <ReusableTitle text="Courses to get you started" />
      <CoursesSuggest />
      <ReusableTitle text={`All ${catalogPage?.name} courses`} />
      <CoursesAllCatalog />
    </div>
  );
}
