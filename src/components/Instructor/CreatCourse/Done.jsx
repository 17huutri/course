import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { changeStep } from "../../../store/slices/courseSlice/courseSlice";
import {
  createCourse,
  isFulled,
  isUpdatedForm,
  updateCourse,
} from "../../../store/slices/courseSlice/createCourseSlice";

const Done = () => {
  const dispatch = useDispatch();
  const { error, isLoading, isUpdateSuccess, formValue, isUpdateForm } =
    useSelector((state) => state.createCourseReducer);
  const navigate = useNavigate();

  if (isLoading === false) {
    setTimeout(() => {
      navigate("/instructor/catalog");
      dispatch(isFulled(false));
      dispatch(isUpdatedForm(false));
      dispatch(changeStep(0));
    }, 2000);
  }
  const handleDone = () => {
    if (isUpdateForm === true) {
      dispatch(updateCourse(formValue));
    } else {
      dispatch(createCourse(formValue));
    }

    dispatch(changeStep(1));
  };

  useEffect(() => {
    handleDone();
  }, []);

  return (
    <>
      {!error && !isLoading && isUpdateSuccess && (
        <div className="text-center font-bold text-2xl mt-5 text-green-500">
          <h1>Course Update Successfully!</h1>
        </div>
      )}

      {!error && !isLoading && !isUpdateSuccess && (
        <div className="text-center font-bold text-2xl mt-5 text-green-500">
          <h1>Course Created Successfully!</h1>
        </div>
      )}
      {error && (
        <div className="text-center font-bold text-2xl mt-5 text-red-500">
          <h1>Something wrong!!!!!!!!</h1>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-10">
          <PacmanLoader color="hsla(157, 86%, 44%, 1)" size={50} />
        </div>
      )}
    </>
  );
};

export default Done;
