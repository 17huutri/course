import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Introduce from "../components/LandingPage/Introduce";
import Statistics from "../components/LandingPage/Statistics";

import { motion, useScroll } from "framer-motion";
import AboutCenter from "../components/LandingPage/AboutCenter";
import TopCourse from "../components/LandingPage/Features/TopCourse/TopCourse";
import TopInstructor from "../components/LandingPage/Features/TopInstructor/TopInstructor";
import FeedbackCenter from "../components/LandingPage/FeedbackCenter";
import BecomeTeacher from "../components/LandingPage/BecomeTeacher";
import { useDispatch } from "react-redux";
import { getYourCourse } from "../store/slices/userSlice";

function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
    dispatch(getYourCourse());
  }, []);
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className=" fixed top-0 left-0 right-0 h-[5px] transform origin-[0%] bg-blue-600 z-50 "
        style={{ scaleX: scrollYProgress }}
      />
      <div className="relative ">
        {/* <Header /> */}
        <Introduce />

        <Statistics />

        <AboutCenter />

        <TopCourse />

        <TopInstructor />

        <FeedbackCenter />

        <BecomeTeacher />
      </div>
    </>
  );
}

export default LandingPage;
