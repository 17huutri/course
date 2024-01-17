import React, { useEffect } from "react";

import Text from "../animations/TextAnimation";
import { useDispatch, useSelector } from "react-redux";
import Clock from "../animations/Clock";
import { clearCourses } from "../store/slices/courseSlice/courseSlice";

export default function InstructorHomePage() {
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCourses());
  }, []);

  return (
    <div className="w-full relative h-screen">
      <img
        className="w-full h-full bg-cover"
        src="/assests/images/photo-1513569771920-c9e1d31714af.jpg"
      />
      <h1
        className="absolute top-[8%] left-[8%] text-white text-[60px] "
        style={{
          textShadow: "0px 0px 0px #3e2b2b, 1px 11px 5px rgba(42, 43, 55, 0.5)",
        }}
      >
        <Text text={`${profile?.lastName} ${profile?.firstName}`} />
      </h1>
      <Clock />
    </div>
  );
}
