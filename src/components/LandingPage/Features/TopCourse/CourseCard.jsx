import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Rate } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "../../../AddToCartButton";
import { format, parseISO } from "date-fns";

function CourseCard({ course }) {
  const { catalog } = useSelector((state) => state.courseReducer);

  const courseCatalogs = course.catalogIDs;

  return (
    <div className="px-3 py-2  bg-white lg:col-span-1 md:col-span-2 sm: col-span-2 flex  flex-col shadow-box_shadow_8">
      <div className="relative">
        <Link to={`/courses/course-detail/${course.id}`}>
          <img
            src={course.image}
            className="  w-full h-[200px] rounded-[5px] object-cover"
            alt="img"
          />
        </Link>
        <AddToCartButton course={course} />
        {/* {isLoading === true && <PropagateLoader />} */}
      </div>
      <p className="text-[#757373a3] font-medium p-[10px]">
        {course.instructor.lastName} {course.instructor.firstName}
      </p>
      <h1 className="line-clamp-2 text-lg pb-2 leading-5 font-semibold text-[#000000f7] ">
        {course.name}
      </h1>
      <p className="text-black text-[12px] pb-2 font-semibold">
        Update:{" "}
        <span className="text-[#5a8200]">
          {format(parseISO(course.createdDate), "MMM dd, yyyy")}
        </span>
      </p>
      <div className="pb-2 flex items-center justify-between text-[12px]">
        <p>
          <FontAwesomeIcon icon={faUserGroup} className="pr-[5px]" />
          {course.learnerQuantity} Students
        </p>
        <p>
          <FontAwesomeIcon icon={faBook} className="pr-[5px]" />
          20 Lesson
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} className="pr-[5px]" />
          12h 48m
        </p>
      </div>
      <div className="flex justify-between items-center">
        <Rate className="text-[16px]" disabled value={course.avgRate} />
        <p className="font-semibold text-[20px] text-[#2950be] ">
          ${course.price}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
