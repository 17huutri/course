import React, { useEffect, useState } from "react";
import Information from "../components/Instructor/CreatCourse/Information";
import Curriculum from "../components/Instructor/CreatCourse/Curriculum";
import Done from "../components/Instructor/CreatCourse/Done";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Button } from "antd";
import {
  InfoCircleOutlined,
  ReadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import {
  createCourse,
  updateCourse,
} from "../store/slices/courseSlice/createCourseSlice";
import { changeStep } from "../store/slices/courseSlice/courseSlice";
import ProfilePageNav from "../components/ProfilePage/ProfilePageNav";

const CreateCoursePage = () => {
  const { formValue, isUpdateForm } = useSelector(
    (state) => state.createCourseReducer
  );
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.courseReducer);

  const handlePrevious = () => {
    dispatch(changeStep(-1));
  };

  const steps = [
    {
      title: "Information",
      content: <Information />,
      icon: <InfoCircleOutlined />,
    },
    // {
    //   title: "Curriculum",
    //   content: <Curriculum />,
    //   icon: <ReadOutlined />,
    // },
    {
      title: "Done",
      content: <Done />,
      icon: <CheckCircleOutlined />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="h-full overflow-y-scroll">
      <ProfilePageNav text={"Create New Course"} />
      <div className=" px-10 mt-5 pb-5">
        <div className=" bg-gray_1 rounded-[10px] px-4 py-10 mb-5">
          <Steps current={currentStep} items={items} />
        </div>
        <>{steps[currentStep]?.content}</>
      </div>
    </div>
    // <div className="bg-gray-100 py-8 h-full">
    //   <div className="max-w-5xl mx-auto p-6 bg-slate-100 rounded shadow-md overflow-y-auto h-full">
    //     <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>
    //     <Steps current={currentStep} items={items} />
    //     <div>{steps[currentStep].content}</div>

    // <div className="flex justify-end pt-3" style={{}}>
    //   {currentStep === 1 && <Button onClick={handleDone}>Next</Button>}
    //   {currentStep === 1 && (
    //     <Button
    //       style={{
    //         margin: "0 8px",
    //       }}
    //       onClick={() => handlePrevious()}
    //     >
    //       Previous
    //     </Button>
    //   )}
    // </div>
    //   </div>
    // </div>
  );
};

export default CreateCoursePage;
