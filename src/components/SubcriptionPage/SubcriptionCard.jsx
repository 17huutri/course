import React from "react";
import PaginationOfSub from "./PaginationOfSub";
function SubcriptionCard() {
  return (
    <div className="bg-gray-200 h-[65%] mx-9 py-8 rounded-[8px] ">
      <div className="w-1/4 h-[95%] box-border flex flex-col items-center ml-7 bg-white pt-4  rounded-[8px]">
        <div className="card-img w-44 h-44 ">
          <img
            src="/assests/images/avatar_tempt/avatar.jpg"
            className="w-full h-full rounded-full bg-gray-50"
            alt=""
          />
        </div>
        <div className="card-content w-full px-4 py-6">
          <h2 className="mb-2 font-bold text-xl text-center">
            Introductors Name
          </h2>
          <p className="mb-4">
            “Quote of Instructors Quote of Instructors. Quote of Instructors
            Quote of Instructors”
          </p>
        </div>
      </div>
      <div className=" flex justify-center">
        <PaginationOfSub />
      </div>
    </div>
  );
}

export default SubcriptionCard;
