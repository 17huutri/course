import React from "react";

function CoursesPageNav() {
  return (
    <div className=" w-full h-[70px]  flex items-center justify-between border-b border-solid border-gray_2">
      <h1 className=" font-bold text-[30px]">Course</h1>
      <img
        src="/assests/images/homepages/avt.png"
        alt=""
        className=" w-[50px] rounded-full cursor-pointer"
      />
    </div>
  );
}

export default CoursesPageNav;
