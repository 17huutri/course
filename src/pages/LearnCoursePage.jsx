import React, { useEffect, useState } from "react";
import CoursesPageNav from "../components/HomeCoursesPage/CoursesPageNav";
import SectionCourse from "../components/HomeCoursesPage/LearnCourses/SectionCourse";
import NoteCourse from "../components/HomeCoursesPage/LearnCourses/NoteCourse";
import VideoCourse from "../components/HomeCoursesPage/LearnCourses/VideoCourse";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetailById } from "../store/slices/courseSlice/courseSlice";
import BreadcrumbStudying from "../common/BreadcrumbStudying";

export default function LearnCoursePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.courseReducer);
  useEffect(() => {
    dispatch(getCourseDetailById(id));
  }, [dispatch]);

  return (
    <div className="py-[2%] px-[5%]">
      <BreadcrumbStudying courseDetail={courseDetail} />
      <div className=" w-full px-2 pt-4 flex">
        <div className="w-[25%] h-full">
          <SectionCourse />
        </div>
        <div className="w-[50%] px-6 h-full">
          <VideoCourse />
        </div>
        <div className="w-[25%] h-full ">
          <NoteCourse />
        </div>
      </div>
    </div>
  );
}
