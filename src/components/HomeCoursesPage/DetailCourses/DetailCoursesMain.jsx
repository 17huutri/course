import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { faClock } from "@fortawesome/free-solid-svg-icons";
function DetailCoursesMain() {
  return (
    <>
      <div className="bg-gray-400 h-[350px] rounded-md my-4"></div>
      <div className="flex  items-center pt-2">
        <Rate className="text-[15px] pr-[10%]" disabled defaultValue={2} />
        <p className="bg-blue_5 px-2 justify-center  flex  w-[70px] text-white rounded-full">
          Title
        </p>
      </div>
      <div className="py-2">
        <h1 className="font-bold text-[25px]">Course Name</h1>
        <p className=" text-text_color_2 text-[15px] ">
          Course description Course description Course description Course
          description Course description Course description Course description
          Course description Course description Course description Course
          description Course description
        </p>
      </div>
      <div className="flex items-center py-2">
        <img
          src="/assests/images/homepages/avt.png"
          alt=""
          className=" w-[60px] rounded-full cursor-pointer"
        />
        <div className="pl-4">
          <h1 className="  font-medium ">Name Instructor</h1>
          <p className="text-[12px] text-text_color_2">Specialize teacher</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <h1 className="font-bold text-[20px]">Course Content</h1>
        <p className="text-[15px] text-text_color_2">Number section - Time</p>
      </div>
      <div className=" my-7 last:mb-0 flex gap-4 shadow-box_shadow_2 rounded-[15px] ">
        <img
          src="/assests/images/landing_pages/land_page_2.jpg"
          className="w-[150px] h-[142px] rounded-l-[15px]"
          alt="img"
        />
        <div className="flex-col pr-[200px] pl-2 py-2 relative  ">
          <p className="text-text_color_2 flex items-center pb-2">
            {" "}
            <FontAwesomeIcon
              className=" text-[15px] pr-[5%]"
              icon={faClock}
            />{" "}
            30:00 mins{" "}
          </p>

          <h1 className="font-semibold  text-[16px]"> Name of Section</h1>
          <p className="line-clamp-2  text-text_color_2 text-[12px] py-4">
            Descripton of Section Descripton of Section Descripton of Section
            Descripton of Section Descripton of Section
          </p>
          <FontAwesomeIcon
            className="text-[40px] absolute right-[5%] top-[50%] transform translate-y-[-50%] "
            icon={faCirclePlay}
          />
        </div>
      </div>
      <div className=" my-7 last:mb-0 flex gap-4 shadow-box_shadow_2 rounded-[15px] ">
        <img
          src="/assests/images/landing_pages/land_page_2.jpg"
          className="w-[150px] h-[142px] rounded-l-[15px]"
          alt="img"
        />
        <div className="flex-col pr-[200px] pl-2 py-2 relative  ">
          <p className="text-text_color_2 flex items-center pb-2">
            {" "}
            <FontAwesomeIcon
              className=" text-[15px] pr-[5%]"
              icon={faClock}
            />{" "}
            30:00 mins{" "}
          </p>

          <h1 className="font-semibold  text-[16px]"> Name of Section</h1>
          <p className="line-clamp-2  text-text_color_2 text-[12px] py-4">
            Descripton of Section Descripton of Section Descripton of Section
            Descripton of Section Descripton of Section
          </p>
          <FontAwesomeIcon
            className="text-[40px] absolute right-[5%] top-[50%] transform translate-y-[-50%] "
            icon={faCirclePlay}
          />
        </div>
      </div>
    </>
  );
}

export default DetailCoursesMain;
