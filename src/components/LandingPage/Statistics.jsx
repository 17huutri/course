import React from "react";
import { Facts } from "./Features/Fact";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function Statistics() {
  const { catalog } = useSelector((state) => state.courseReducer);
  const location = useLocation();
  const decodedCurrentPath = decodeURIComponent(location.pathname);
  return (
    <div
      className="sm: !bg-none lg:px-20 sm: px-10 py-12 bg-white bg-contain bg-no-repeat bg-left-top"
      style={{
        backgroundImage: `url(/assests/images/landing_pages/cool-background.png)`,
      }}
    >
      <div className="grid grid-cols-10  bg-[#4585bd] px-8 py-8 rounded-md">
        <div className="col-span-3 flex flex-col">
          <p className="text-white font-medium text-[14px]">
            Career Learning Paths
          </p>
          <h1 className="md:text-[30px]  sm: text-[20px] py-3 text-white font-medium">
            Explore Careers
          </h1>
          <p className=" md:text-[16px] sm: text-[13px] text-[#d2d2d2]">
            Build career-relevant skills with courses from top universities and
            companies
          </p>
        </div>
        <div className="col-span-7 px-[10%]">
          <p className="text-white font-medium text-[14px]">
            Find your next role
          </p>
          <div className=" grid lg:grid-cols-9 md:grid-cols-8 sm: grid-cols-1 gap-4  py-6">
            {catalog &&
              catalog.slice(0, 6).map((catl) => (
                <Link
                  key={catl.id}
                  to={`courses/${catl.name.replace(/ /g, "-")}`}
                  className="lg:col-span-3 md:col-span-4 sm: col-span-1 bg-white flex items-center justify-between rounded-[5px] px-2 py-2  "
                >
                  <p className="text-[15px] font-medium text-[#0b477a]">
                    {catl.name}
                  </p>
                  <BsArrowRight className="text-[#0b477a]" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
