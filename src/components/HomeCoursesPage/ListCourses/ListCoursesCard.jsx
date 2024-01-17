import React from "react";
import { Rate } from "antd";

import { BsCameraVideo } from "react-icons/bs";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "../../../common/ProgressCircle";
import { Link } from "react-router-dom";
function ListCoursesCard({ course }) {
  const percenCompleteCourse = 100;
  return (
    <div
      className="col-span-2 relative  z-30 px-4 py-2 rounded-[10px] shadow-box_shadow_9  bg-no-repeat bg-center bg-cover  before:bg-[#071e46cf] before:z-1 before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:w-full  before:rounded-[10px]"
      style={{ backgroundImage: `url(${course.image})` }}
    > <Link to={`/studyingcourse/${course.id}`}>
      <div className="flex gap-4 items-center pb-8 z-30 relative ">
        <ProgressCircle
          className="z-10"
          width={80}
          height={80}
          progress={percenCompleteCourse}
        />
        <div className="flex flex-col relative z-20">
          <p className="text-[20px] text-[#a7a7a7]">
            <span className="text-[35px] text-white font-semibold">7</span>/28
          </p>
          <p className="text-white">Lessons</p>
        </div>
      </div>
      <Rate
        className="text-[#41efb2] text-[14px]"
        allowHalf
        disabled
        value={2}
      />
      <p className="text-[20px] relative text-white z-20 line-clamp-2 font-semibold">
        {course.name}
      </p>
      <div className="flex items-center relative z-20 gap-4 py-8">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={course.instructor.image}
        />
        <p className="text-white">
          <span className="text-[#c3c3c387]">By </span>
          {course.instructor.lastName} {course.instructor.firstName}
        </p>
      </div>
      <div className="flex items-center relative z-20 text-white">
        <PiClockClockwiseBold className="text-[16px]" />
        <p className="pl-1 text-[13px]"> 12Hrs</p>
        <span className="px-4">/</span>
        <BsCameraVideo className="text-[16px]" />
        <p className="pl-2 text-[13px]">28</p>
      </div>
      <FontAwesomeIcon
        className={` ${
          percenCompleteCourse === 100 ? "text-[#0092ff]" : " text-[#ff9100]"
        } absolute text-[40px]  top-0 right-0`}
        icon={faBookmark}
      />
      </Link>
    </div>
  );
}

export default ListCoursesCard;
