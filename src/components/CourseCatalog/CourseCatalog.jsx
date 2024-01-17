import React, { useEffect, useState } from "react";
import CourseCard from "../LandingPage/Features/TopCourse/CourseCard";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setFilter,
} from "../../store/slices/courseSlice/courseSlice";
import Pagination from "../Pagination/Pagination";
import FilterCourse from "./FilterCourse";

export default function CourseCatalog() {
  const { catalog } = useSelector((state) => state.courseReducer);
  // const isLastCard = true;
  const currentPage = useSelector((state) => state.courseReducer.currentPage);
  const perPage = useSelector((state) => state.courseReducer.perPage);
  const courses = useSelector((state) => state.courseReducer.courses);
  const courseSort = useSelector((state) => state.courseReducer.courseSort);

  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, dispatch]);

  const [sortedCourses, setSortedCourses] = useState([]);

  useEffect(() => {
    if (!courseSort) {
      dispatch(setFilter("0"));
    }
  }, [courseSort, dispatch]);

  useEffect(() => {
    if (Array.isArray(courses)) {
      let newSortedCourses = [...courses];
      switch (courseSort) {
        case "0":
          newSortedCourses = newSortedCourses.sort(
            (a, b) => b.avgRate - a.avgRate
          );
          break;
        case "1":
          newSortedCourses = newSortedCourses.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "2":
          newSortedCourses = newSortedCourses.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        case "3":
          newSortedCourses = newSortedCourses.sort(
            (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
          );
          break;
        case "4":
          newSortedCourses = newSortedCourses.sort(
            (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
          );
          break;
        default:
          newSortedCourses = [...courses];
      }
      setSortedCourses(newSortedCourses);
    } else {
      setSortedCourses([]);
    }
  }, [courseSort, courses]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  return (
    <div className="mb-12">
      <h1 className="font-bold text-3xl text-blue_3 text-center mb-2">
        All Courses
      </h1>
      <FilterCourse />
      <div className="container px-20 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(paginatedCourses)
            ? paginatedCourses.map((item, index, array) => (
              <div key={item.id}>
                <CourseCard
                  isLastCard={
                    index === array.length - 1 || (index + 1) % 4 === 0
                  }
                  course={item}
                  catalog={catalog}
                />
              </div>
            ))
            : null}
        </div>
      </div>

      <Pagination
        totalPage={Math.ceil(sortedCourses.length / perPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
