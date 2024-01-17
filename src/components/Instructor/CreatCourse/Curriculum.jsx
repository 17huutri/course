import React, { useState } from "react";
import { Button, Input, Modal, Form, Upload, Radio, Flex } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFileLines, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import CurricuUrl from "./CurriculumCompo/CurricuUrl";
import CurricuFile from "./CurriculumCompo/CurricuFile";
import { useDispatch, useSelector } from "react-redux";

import {
  createSection,
  deleteSection,
  getSection,
  isUpdateSec,
  isUpdateSection,
  setIsSelectedd,
} from "../../../store/slices/courseSlice/curriculumSlice";
import TextEditCurri from "./CurriculumCompo/TextEditCurri";
import SectionCom from "./CurriculumCompo/SectionCom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LessonCom from "./CurriculumCompo/LessonCom";

const Curriculum = () => {
  const [sections, setSections] = useState([]);
  const [isAddSectionModalVisible, setAddSectionModalVisible] = useState(false);
  const [isEditSectionModalVisible, setEditSectionModalVisible] =
    useState(false);
  const [isAddLessonModalVisible, setAddLessonModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [videoType, setVideoType] = useState("file");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [form] = Form.useForm();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const dispatch = useDispatch();
  const { sectionForm, courseID, courseSec } = useSelector(
    (state) => state.curricullumReducer
  );
  const [showModal, setShowModal] = useState(false);
  const [showModalLess, setShowModalLess] = useState(false);
  const { courses, catalog } = useSelector((state) => state.courseReducer);
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");

  const handleDeleteSection = (id) => {
    console.log(id);
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(setIsSelectedd(id));
      dispatch(deleteSection(id));
      deleteSuccessNotify();
    }
  };

  const handleAddLesson = (values) => {
    if (selectedSectionIndex !== null) {
      const newSections = [...sections];
      const lesson = {
        name: values.lessonName,
        // description: lessonDescription,
        videoType: values.videoType,
        videoFile: values.videoType === "file" ? values.videoFile : "",
        videoURL: values.videoType === "url" ? values.videoURL : "",
      };
      newSections[selectedSectionIndex].lessons.push(lesson);
      setSections(newSections);
      setAddLessonModalVisible(false);
      setCurrentLesson(lesson);
      setSelectedSectionIndex(null);
      form.resetFields();
    }
  };
  const handleUpdateSection = (section) => {
    setShowModal(true);
    dispatch(isUpdateSection(section));
    dispatch(isUpdateSec(true));
  };
  const handeAddNewLesson = (section) => {
    setShowModalLess(true);
  };
  useEffect(() => {
    dispatch(getSection(courseID));
    console.log(courseID);
    console.log(courseSec);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[20px]">Curriculum</h1>
      </div>
      {/* Add Section */}
      <div className="flex justify-end">
        <SectionCom showModal={showModal} setShowModal={setShowModal} />
      </div>

      <div className="border border-solid w-full border-gray_2  py-1 mt-2 rounded-[10px]">
        {courseSec &&
          courseSec.map((section, sectionIndex) => (
            <div
              className={`flex flex-col w-full ${
                sectionIndex === 0 ? "mt-0" : "mt-4"
              } `}
              key={sectionIndex}
            >
              <div
                className={`flex justify-between gap-4 items-center w-full px-4  pb-[0.5rem]  ${
                  sectionIndex === 0
                    ? " border-b border-solid border-gray_2 pt-1"
                    : "pt-[0.5rem] border-solid border-gray_2 border-b border-t"
                } `}
              >
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-[20px]" icon={faBars} />
                  <p className="bg-[#e3e0e0] px-[10px] py-[2px] text-[14px] text-[#525151] rounded-[5px]">
                    {section.name}
                  </p>
                </div>
                <div className="flex item-center gap-4">
                  <button className=" justify-end">
                    <UploadOutlined
                      className="text-blue-600"
                      onClick={() => handleUpdateSection(section)}
                    />
                  </button>
                  <button
                    className=" justify-end"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    <DeleteOutlined className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-2 ">
                {/* {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    className="flex items-center gap-2 px-6 font-medium"
                    key={lessonIndex}
                  >
                    <FontAwesomeIcon icon={faFileLines} />
                    <p>
                      Lesson {lessonIndex + 1}: {lesson.name}
                    </p>
                  </div>
                ))} */}
                <div className="bg-black flex gap-4 py-2 px-4">
                  <button
                    className="text-white"
                    onClick={() => {
                      setSelectedSectionIndex(sectionIndex);
                      handeAddNewLesson();
                    }}
                  >
                    <FontAwesomeIcon className="pr-2" icon={faSquarePlus} />
                    Add Lesson
                  </button>
                  <button className="text-white">
                    <FontAwesomeIcon className="pr-2" icon={faSquarePlus} />
                    Assignment
                  </button>
                </div>
              </div>
            </div>
          ))}{" "}
      </div>
      {selectedSectionIndex !== null && (
        // Add Lesson
        <LessonCom
          showModalLess={showModalLess}
          setShowModalLess={setShowModalLess}
        />
      )}
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default Curriculum;
