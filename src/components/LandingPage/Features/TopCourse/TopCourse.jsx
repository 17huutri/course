import React from "react";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TopCourse() {
  const { courses } = useSelector((state) => state.courseReducer);

  return (
    <div className="pt-[120px] pb-[150px] px-[7%] ">
      <h1
        className="font-bold text-[45px] text-blue_3  mb-2"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Our Top Courses
      </h1>
      <div className="flex justify-end">
        <Link to="/courses" className="text-blue_2 cursor-pointer mb-2">
          View all
        </Link>
      </div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {courses &&
          courses.slice(0, 4).map((item, index) => {
            return <CourseCard key={item?.id} course={item} />;
          })}
      </div>
    </div>
  );
}

export default TopCourse;
