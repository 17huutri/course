import React from "react";

export default function BecomeTeacher() {
  return (
    <div
      className=" sm:px-[20%] px-[10%] py-[10%] bg-no-repeat bg-center bg-cover h-[500px] w-full relative before:bg-[#071e46cf] before:z-1 before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:w-full"
      style={{ backgroundImage: "url('/assests/images/becomeTeacher.jpg')" }}
    >
        <div className="relative flex flex-col z-10">
            <h1 className="sm:text-[30px] text-[25px] pb-10 text-white font-semibold text-center ">Join Our Team Of Dedicated <span className="text-[#0093ff]">Instructors,</span> Shaping The Future Of Enthusiastic Minds</h1>
            <p  className="text-[15px] text-[#cdcdcd] font-normal px-10 pb-10 text-center ">Discover the fulfilling role of an instructor at our center, where you'll have the chance to share your knowledge, foster growth, and be part of a supportive educational community</p>
            <div className="flex justify-center">
            <button className="bg-[#0093ff] text-[14px] px-4 py-2 rounded-[3px] font-medium text-white">BECOME A TEACHER</button>
            </div>
        </div>
    </div>
  );
}
