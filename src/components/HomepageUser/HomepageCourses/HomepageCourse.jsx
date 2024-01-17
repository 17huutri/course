import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import HomeCourseCard from "./HomeCourseCard";

const HomepageCourse = () => {
  return (
    <div className="px-10 m-auto mt-5 flex items-center ">
      <div className="text-2xl cursor-pointer">
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="w-[90%] m-auto">
        <div className="flex justify-between mb-5">
          <h1 className="font-bold text-3xl text-blue_3 mb-2">Courses</h1>

          <div className="mb-2 mt-3">
            <a className="cursor-pointer font-bold mr-2">View all</a>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <HomeCourseCard />
          <HomeCourseCard />
          <HomeCourseCard />
          <HomeCourseCard />
        </div>
      </div>

      <div className="text-2xl cursor-pointer">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};
export default HomepageCourse;
