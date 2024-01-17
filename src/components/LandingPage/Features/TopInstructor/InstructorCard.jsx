import React from "react";
import { Link } from "react-router-dom";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

function InstructorCard({ instructor }) {
  return (
    <Link className="lg:col-span-3 col-span-4 flex items-center justify-between px-4 py-2 rounded-[4px] bg-[#4585bd]"
      to={`/instructor/instructor-profile/${instructor.id}`}>

      <div className="flex items-center">
        <img
          src={instructor.image}
          className="rounded-[50%] w-[50px] h-[50px]"

        />
        <div className="flex flex-col pl-5">
          <h1 className="text-white font-medium text-[18px]">
            {instructor.lastName} {instructor.firstName}
          </h1>
          <p className="text-white text-[12px]">{instructor.career}</p>
        </div>
      </div>
      <BsFillArrowUpRightSquareFill className="text-white text-[40px] rounded-[8px]" />

    </Link>
  );
}

export default InstructorCard;
