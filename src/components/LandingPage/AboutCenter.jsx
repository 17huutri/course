import { useAnimation } from "framer-motion";
import React, { useRef, useEffect } from "react";

import { useInView } from "react-intersection-observer";

export default function AboutCenter() {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: false });

  const controls1 = useAnimation();

  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  useEffect(() => {
    if (inView) {
      controls1.start({
        x: "60px",
        y: "40px",
        opacity: 1,
      });
    } else {
      controls1.start({
        x: 0,
        y: 0,
        opacity: 0,
      });
    }

    if (inView) {
      controls2.start({
        x: "-40px",
        y: "0px",
        opacity: 1,
      });
    } else {
      controls2.start({
        x: 0,
        y: 0,
        opacity: 0,
      });
    }

    if (inView) {
      controls3.start({
        x: "100px",
        y: "0px",
        opacity: 1,
      });
    } else {
      controls3.start({
        x: 0,
        y: 0,
        opacity: 0,
      });
    }

    if (inView) {
      controls4.start({
        x: "-110px",
        y: "30px",
        opacity: 1,
      });
    } else {
      controls4.start({
        x: 0,
        y: 0,
        opacity: 0,
      });
    }
  }, [inView, controls1, controls2, controls3, controls4]);

  return (
    <div
      ref={containerRef}
      className="grid lg:grid-cols-2 sm: grid-cols-1 p-[20px] bg-gray_1 lg:h-[600px]"
    >
      <div className="md:col-span-1 md:block hidden relative lg:h-[600px] sm: h-[400px]">
        <div className=" absolute lg:top-[40%] sm: top-[57%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99] lg:w-[80%] sm: w-[40%] ">
          <img
            className="rounded-box_radius_3 bg-background_gradient_3 lg:w-[63%] mx-auto"
            src="/assests/images/landing_pages/aboutImg.png"
          ></img>
          <div
            ref={ref}
            initial={{ x: "0%", y: "0%", opacity: 0 }}
            animate={controls1}
            transition={{ duration: 2, type: "tween" }}
            className="absolute lg:top-[0%] lg:left-[0%] sm: top-[-30px] w-[100px] h-[100px] flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#92d9bb] p-4"
          >
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Students</p>
          </div>
          <div
            ref={ref}
            initial={{ x: "0%", y: "0%", opacity: 0 }}
            animate={controls2}
            transition={{ duration: 2, type: "tween" }}
            className="absolute top-[10%] right-[0%] w-[100px] h-[100px] flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#ededc8] p-4"
          >
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Courses</p>
          </div>
          <div
            ref={ref}
            initial={{ x: "0%", y: "0%", opacity: 0 }}
            animate={controls3}
            transition={{ duration: 2, type: "tween" }}
            className="absolute bottom-[0%] left-[0%] w-[100px] h-[100px] flex flex-col items-center z-[100] shadow-box_shadow_7 rounded-[10px] bg-[#d6c4e2] p-4"
          >
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Teachers</p>
          </div>
          <div
            ref={ref}
            initial={{ x: "0%", y: "0%", opacity: 0 }}
            animate={controls4}
            transition={{ duration: 2, type: "tween" }}
            className="absolute bottom-[0%] right-[0%] w-[100px] h-[100px] flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#d67f7f] p-4"
          >
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Rate</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 pl-5 xl:pr-[10rem] lg:pr-[5rem] py-10">
        <h1
          style={{ textShadow: "-11px 10px 8px #909090b3" }}
          className="lg:text-[43px] md:text-[38px] sm: text-[30px] text-[#000000b3] shadow-text_shadow_2 pb-2 pt-6 font-cabin font-semibold"
        >
          Now learning from anywhere, and build your bright career
        </h1>
        <p className="text-[#594e5cdb] pb-6">
          In this digital age, learning knows no boundaries. With a plethora of
          online resources, you can gain knowledge and skills from anywhere.
          Embrace this flexibility to craft a promising career aligned with your
          passions
        </p>
        <button className="bg-[#4585bd] text-white font-semibold  px-6 py-3 rounded-[10px] shadow-box_shadow_7">
          Learn More
        </button>
        <div className=" pt-[5%] grid-cols-2 gap-3 md:hidden grid">
          <div className="col-span-1 w-[100px] h-[100px] mx-auto flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#92d9bb] p-4">
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Students</p>
          </div>
          <div className=" col-span-1  w-[100px] h-[100px]  mx-auto  flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#ededc8] p-4">
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Courses</p>
          </div>
          <div className=" col-span-1 w-[100px] h-[100px]  mx-auto flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#d6c4e2] p-4">
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Teachers</p>
          </div>
          <div className=" col-span-1 w-[100px] h-[100px]  mx-auto flex flex-col items-center z-[200] shadow-box_shadow_7 rounded-[10px] bg-[#d67f7f] p-4">
            <h1 className="font-semibold text-[25px]">3k+</h1>
            <p className="font-medium text-[15px]">Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
