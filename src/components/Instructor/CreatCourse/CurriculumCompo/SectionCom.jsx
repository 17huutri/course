import React, { useState } from "react";
import TextEditCurri from "./TextEditCurri";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaSection from "../../../../YupGlobal/schemaYup/inforSectionYup";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  getSection,
  isCancelFormSec,
  isCousedSelect,
  isUpdateSec,
  updateSection,
} from "../../../../store/slices/courseSlice/curriculumSlice";
import { useEffect } from "react";

export default function SectionCom({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const { sectionForm, courseID, courseSec, isUpdateSection1 } = useSelector(
    (state) => state.curricullumReducer
  );
  const { handleSubmit, control, register, formState, reset } = useForm({
    resolver: yupResolver(schemaSection),
    defaultValues: {
      id: sectionForm?.id,
      nameSection: sectionForm.nameSection,
      descriptionSec: sectionForm.descriptionSec,
    },
  });

  const { errors } = formState;

  const handleOnsubmit = (data) => {
    const newValues = { ...data, courseID };

    if (isUpdateSection1 === true) {
      dispatch(updateSection(newValues));
    } else {
      dispatch(createSection(newValues));
    }
    dispatch(getSection(courseID));

    setShowModal(false);
  };
  const handeCancelSec = () => {
    dispatch(isCancelFormSec());
    setShowModal(false);
  };
  const handleAddNewSec = () => {
    setShowModal(true);
    dispatch(isUpdateSec(false));
  };
  useEffect(() => {
    reset({
      nameSection: sectionForm.nameSection,
      descriptionSec: sectionForm.descriptionSec,
      id: sectionForm?.id,
    });
    console.log(sectionForm);
  }, [sectionForm]);

  return (
    <>
      <button
        className="!bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg  rounded-lg"
        type="button"
        onClick={handleAddNewSec}
      >
        Add new Section
      </button>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
            <form
              className="relative w-[40%]"
              onSubmit={handleSubmit(handleOnsubmit)}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-4">
                <div>
                  <p className="font-bold">Name</p>
                  <input
                    name="nameSection"
                    {...register("nameSection")}
                    placeholder="Name ............"
                    type="text"
                    className="w-full border border-solid border-black rounded-lg px-3 py-2"
                  />
                  <div className="text-left  text-red-500">
                    {errors.nameSection?.message}
                  </div>
                </div>
                <div>
                  <p className="font-bold">Description</p>
                  <Controller
                    name="descriptionSec"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextEditCurri onChange={onChange} value={value} />
                    )}
                  />
                  <div className="text-left  text-red-500">
                    {errors.descriptionSec?.message}
                  </div>
                </div>

                <div className="flex items-center justify-end pt-5 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="!bg-red-500 text-white background-transparent font-bold uppercase  px-4 py-3 text-sm mr-2 rounded-lg"
                    type="button"
                    onClick={handeCancelSec}
                  >
                    Cancel
                  </button>
                  <button
                    className="!bg-emerald-500 text-white font-bold uppercase text-sm px-3 py-3 rounded-lg shadow hover:shadow-lg  "
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
