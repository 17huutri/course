import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import { Steps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function SectionCourse({ setSectionName }) {
  const format = (percent) => {
    return percent === 100 ? (
      <FontAwesomeIcon
        icon={faCheck}
        className="text-[26px] font-bold text-[#0075FF]"
      />
    ) : (
      `${percent}%`
    );
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [lessons, setLessons] = useState([]);

  const dataGiaTest = [
    {
      sectionName: "Lesson Lesson Lesson 1",
      isCompleted: true,
      percent: 100,
      time: "10:02",
    },
    { sectionName: "Lesson 2", isCompleted: true, percent: 100, time: "10:30" },
    { sectionName: "Lesson 2", isCompleted: false, percent: 87, time: "10:45" },
    { sectionName: "Lesson 2", isCompleted: false, percent: 25, time: "23:00" },
  ];

  useEffect(() => {
    setLessons(dataGiaTest);
  }, []);

  return (
    <div className="border border-solid border-[#D6D6D6] rounded-[25px] ">
      <div
        onClick={toggleDropdown}
        className={`flex justify-between items-center gap-10 p-4 border border-solid border-green_2 rounded-[25px] ${
          showDropdown ? "bg-green_1" : ""
        } `}
      >
        <div className="flex items-center">
          <Progress
            strokeColor="#0075FF"
            trailColor="white"
            type="circle"
            format={() => format(100)}
            percent={100}
            size={40}
          />
          <div className="pl-2">
            <p className="text-[12px]">section 1</p>
            <h1 className="font-bold text-[13px]">Section Name</h1>
          </div>
        </div>
        <FontAwesomeIcon icon={showDropdown ? faChevronUp : faChevronDown} />
      </div>

      {showDropdown && (
        <div className="py-5 px-5">
          <Steps
            direction="vertical"
            current={lessons.findIndex((lesson) => !lesson.isCompleted)}
          >
            {lessons.map((lesson, index) => (
              <Steps.Step
                className="pb-4 cursor-pointer"
                key={index}
                title={
                  <div className="flex items-center">
                    <span>{lesson.sectionName}</span>
                    <span className="">{lesson.time}</span>
                  </div>
                }
                onClick={() => setSectionName(lesson.sectionName)}
              />
            ))}
          </Steps>
        </div>
      )}
    </div>
  );
}
