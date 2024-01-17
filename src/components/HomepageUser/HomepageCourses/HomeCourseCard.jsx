import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const HomeCourseCard = () => {
  return (
    <div className="w-1/4 shadow-box_shadow_1">
      <div className="card-img w-full h-52">
        <img
          src="/assests/images/landing_pages/land_page_2.jpg"
          className="w-full h-full"
          alt=""
        />
      </div>
      <div className="card-content bg-gray_1 w-full px-1 py-6">
        <p className="mb-2 bg-blue-400 w-16 text-white rounded-md text-center py-1 px-4 ml-2">
          Title
        </p>
        <h2 className="mb-2 font-bold text-xl ml-2">Name Course</h2>
        <p className="mb-4 ml-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam n
        </p>
        <div className="flex justify-between">
          <div className="text-yellow-400 font-bold flex">
            <p className="mr-1">4.2</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <p className="text-blue_4 font-bold">120.00$</p>
        </div>
      </div>
    </div>
  );
};
export default HomeCourseCard;
