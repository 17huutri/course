import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../../LandingPage/Features/TopCourse/CourseCard";
import { Pagination } from "@mui/material";
import { BsFilter } from "react-icons/bs";

import FilterCourseCatalog from "./FilterCourseCatalog";
import { useLocation } from "react-router-dom";

const CoursesAllCatalog = () => {
  const location = useLocation();
  const { listCourseOfCatalog } = useSelector((state) => state.courseReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPrice, setFilterPrice] = useState([0, 1000]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(listCourseOfCatalog);
  const itemsPerPage = 16;
  const totalItems = filteredCourses?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const closeFilterPanel = () => {
    setShowFilterPanel(false);
  };

  const handleFilterPriceChange = (value) => {
    setFilterPrice(value);
  };

  useEffect(() => {
    const updatedFilteredCourses = listCourseOfCatalog?.filter((course) => {
      const coursePrice = course.price;
      return coursePrice >= filterPrice[0] && coursePrice <= filterPrice[1];
    });
    setFilteredCourses(updatedFilteredCourses);
  }, [listCourseOfCatalog, filterPrice]);

  useEffect(() => {
    setShowFilterPanel(false);
    setFilterPrice([0, 1000]);
  }, [location]);

  return (
    <div className="flex flex-row gap-4 overflow-x-hidden transition-transform ease-in-out duration-500">
      {showFilterPanel && (
        <FilterCourseCatalog
          showFilterPanel={showFilterPanel}
          onClose={closeFilterPanel}
          filterPrice={filterPrice}
          onFilterPriceChange={handleFilterPriceChange}
        />
      )}

      <div className="flex flex-col gap-4 transform transition-all ease-in-out duration-500">
        <div className="flex justify-between items-center">
          <div className="flex">
            {!showFilterPanel && (
              <button
                className="flex items-center text-[20px] rounded-[10px] border px-2 py-1"
                onClick={toggleFilterPanel}
              >
                <BsFilter className="text-[25px]" /> Filter
              </button>
            )}
          </div>
          <p>{totalItems} Results</p>
        </div>

        <div
          className={`w-full justify-center grid ${showFilterPanel ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } md:grid-cols-6 sm:grid-cols-2 gap-4 `}
        >
          {filteredCourses &&
            filteredCourses.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
        </div>

        <Pagination
          variant="outlined"
          color="primary"
          className="mx-auto"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CoursesAllCatalog;
