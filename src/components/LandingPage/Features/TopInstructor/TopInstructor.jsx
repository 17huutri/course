import React from "react";
import InstructorCard from "./InstructorCard";
import { useSelector } from "react-redux";

function TopInstructor() {
  const { instructor } = useSelector((state) => state.instructorReducer);
  return (
    <div className="pt-[120px] pb-[150px] px-[7%] bg-gray_1 ">
      <div>
        <h1 className="font-bold text-[45px] text-blue_3 mb-2">
          Meet Our Best Instructors
        </h1>
        <p className="text-[#0000008a] lg:w-[40%]  ">
          Seize the opportunity to learn from the most accomplished individuals,
          and through this, transform into the finest version of yourself.
        </p>
      </div>

      <div className="flex justify-end">
        <a className="text-blue_2 cursor-pointer mb-2">View all</a>
      </div>
      <div className="w-full grid lg:grid-cols-9  sm:grid-cols-8 grid-cols-4  gap-x-16 gap-y-10">
        {instructor &&
          instructor
            .slice(0, 9)
            .map((ins, index) => (
              <InstructorCard key={index + 1} instructor={ins} />
            ))}
      </div>
    </div>
  );
}

export default TopInstructor;
