import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Introduce() {
  const { isLogin } = useSelector((state) => state.accountReducer);

  return (
    <div className="w-full relative flex lg:flex-row sm: flex-col  bg-white ">
      <div
        className="lg:w-3/5 lg:!bg-none lg:pt-[12%] lg:h-0 sm: h-screen  sm: bg-cover  flex justify-center  "
        style={{
          backgroundImage:
            'url("/assests/images/landing_pages/land_page_1.jpg")',
        }}
      >
        <div
          className="pl-20 intro-content sm: my-auto "
          data-aos="fade-down-right"
          data-aos-delay="300"
          data-aos-offset="300"
        >
          <h1 className="lg:text-black sm: text-black font-bold text-3xl mb-2">
            <span className="text-blue_2">Programming</span> Courses Here,{" "}
            <br></br>
            Knowledge Without <span className="text-blue_2">Limits</span>
          </h1>
          <p className="lg:text-text_color_base sm: text-white mb-2">
            With us, you will feel more confident and ready to tackle any
            programming challenges
          </p>

          {!isLogin && (
            <button className="bg-blue_2 text-white py-2 px-6 rounded-3xl">
              Join Now
            </button>
          )}
        </div>
      </div>

      <div
        className="lg:h-4/12 bg-gray_1 lg:w-9/12 sm: w-full flex justify-between lg:absolute bottom-0 left-0 rounded-r-[20px]  z-10 p-6"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
      >
        <div className="w-1/3 p-2 ">
          <div className="mb-2">
            <FontAwesomeIcon
              className="text-yellow-300 lg:text-xl"
              icon={faCalendar}
            />
          </div>
          <h2 className="font-bold mb-2 lg:text-xl">Innovation</h2>
          <p className="sm: text-[12px] lg:text-[16px]">
            Stay current with industry trends in our courses
          </p>
        </div>
        <div className="w-1/3 p-2 ">
          <div className="mb-2">
            <FontAwesomeIcon
              className="text-blue-400 lg:text-xl"
              icon={faUser}
            />
          </div>
          <h2 className="font-bold mb-2 lg:text-xl">Mentor</h2>
          <p className="sm: text-[12px] lg:text-[16px]">
            Experienced, professional instructors for confident, quality
            learning
          </p>
        </div>
        <div className="w-1/3 p-2 ">
          <div className="mb-2">
            <FontAwesomeIcon
              className="text-red-400 lg:text-xl"
              icon={faCodeBranch}
            />
          </div>
          <h2 className="font-bold mb-2 lg:text-xl">Community</h2>
          <p className="sm: text-[12px] lg:text-[16px]">
            Supportive environment with online forums, resources, and peer
            learning opportunities
          </p>
        </div>
      </div>

      <div
        className="lg:block hidden w-5/12 h-full"
        data-aos="fade-right"
        data-aos-delay="400"
        data-aos-offset="500"
      >
        <img
          src="/assests/images/landing_pages/land_page_1.jpg"
          className="w-full h-full lg:bg-transparent sm:bg-white"
          alt=""
        />
      </div>
    </div>
  );
}

export default Introduce;
