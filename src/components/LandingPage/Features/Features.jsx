import React from "react";
import TopCourse from "./TopCourse/TopCourse";
import TopInstructor from "./TopInstructor/TopInstructor";

function Features() {
  return (
    <div
      style={{ clipPath: "polygon(43% 7%, 100% 0%, 100% 100%, 0% 100%, 0 7%)" }}
    >
      <TopCourse />
      <TopInstructor />
    </div>
  );
}

export default Features;
