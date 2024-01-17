import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isCancelForm } from "../../store/slices/courseSlice/createCourseSlice";
import { changeStep } from "../../store/slices/courseSlice/courseSlice";
export default function CatalogNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateCourse = () => {
    dispatch(isCancelForm());
    dispatch(changeStep(0));
    navigate("/instructor/catalog/createcourse");
  };
  return (
    <div className=" w-full h-[70px]  flex items-center justify-between border-b border-solid border-gray_2">
      <h1 className=" font-bold text-[30px]">Catalog</h1>
      <div className="flex items-center gap-10">
        <button
          onClick={handleCreateCourse}
          className="bg-blue_2 text-white rounded-[5px] text-[13px] px-2 py-2"
        >
          Create New Course
        </button>
        <img
          src="/assests/images/homepages/avt.png"
          alt=""
          className=" w-[50px] rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
