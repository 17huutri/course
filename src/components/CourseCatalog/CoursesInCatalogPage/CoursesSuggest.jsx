import React, { useState } from "react";

import { useSelector } from "react-redux";

import CourseCard from "../../LandingPage/Features/TopCourse/CourseCard";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CoursesSuggest() {
  //const
  const { listCoursesNew, listCoursesRate, listCoursesPopular } = useSelector(
    (state) => state.courseReducer
  );
  const [activeTab, setActiveTab] = useState("MostPopular");
  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  //const Slider
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <ul className="flex gap-8 font-semibold pb-4 border-b border-solid border-gray_2">
        <li
          onClick={() => switchTab("MostPopular")}
          className={
            activeTab === "MostPopular" ? "" : "cursor-pointer text-[#0000007a]"
          }
        >
          Most Popular
        </li>
        <li
          onClick={() => switchTab("New")}
          className={
            activeTab === "New" ? "active" : "cursor-pointer  text-[#0000007a]"
          }
        >
          New
        </li>
        <li
          onClick={() => switchTab("TopRate")}
          className={
            activeTab === "TopRate"
              ? "active"
              : "cursor-pointer  text-[#0000007a]"
          }
        >
          Top Rate
        </li>
      </ul>
      {activeTab === "MostPopular" && (
        <>
          <Slider {...settings} className="pt-4">
            {listCoursesPopular &&
              listCoursesPopular.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
          </Slider>
        </>
      )}
      {activeTab === "New" && (
        <Slider {...settings} className="pt-4">
          {listCoursesNew &&
            listCoursesNew.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
        </Slider>
      )}
      {activeTab === "TopRate" && (
        <>
          <Slider {...settings} className="pt-4">
            {listCoursesRate &&
              listCoursesRate.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
          </Slider>
        </>
      )}
    </>
  );
}
