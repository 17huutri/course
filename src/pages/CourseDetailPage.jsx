import React, { useEffect } from "react";
import ContentDetail from "../components/CourseDetail/ContentDetail";
import HeaderCourseDetail from "../components/CourseDetail/HeaderCourseDetail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetailById } from "../store/slices/courseSlice/courseSlice";
import SmallContent from "../components/CourseDetail/SmallContent";

export default function CourseDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.courseReducer);
  useEffect(() => {
    dispatch(getCourseDetailById(id));
    console.log(id);
  }, [id, dispatch]);

  return (
    <div className="w-full relative bg-[#cee0e659] ">
      <div
        className="w-full absolute top-0   before:bg-[#000000bd] before:z-1 before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:w-full"
        style={{
          height: `calc(100vh - 120px)`,
        }}
      >
        <img className=" h-full w-full" src={courseDetail?.image} />
      </div>
      <HeaderCourseDetail />
      <ContentDetail />
      <SmallContent />
    </div>
  );
}
