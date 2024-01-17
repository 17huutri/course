import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  isFillingfull,
  isFulled,
  isUpdatedForm,
  isUpdatingForm,
} from "../../../store/slices/courseSlice/createCourseSlice";
import { changeStep } from "../../../store/slices/courseSlice/courseSlice";
import TextEditor from "./InformationCompo/TextEditor";
import InforImage from "./InformationCompo/InforImage";
import InforVideo from "./InformationCompo/InforVideo";
import schemaCreate from "../../../YupGlobal/schemaYup/InforCourseYup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

function Information() {
  const dispatch = useDispatch();

  const { catalog, currentStep } = useSelector((state) => state.courseReducer);
  const { formValue, isUpdateForm } = useSelector(
    (state) => state.createCourseReducer
  );

  let categoryCourse =
    catalog && catalog.filter((catl) => formValue.category.includes(catl.id));
  const { handleSubmit, control, register, formState } = useForm({
    resolver: yupResolver(schemaCreate),
    defaultValues: {
      id: formValue?.id,
      nameCourse: formValue.nameCourse,
      description: formValue.description,
      outCome: formValue.outCome,
      priceCourse: formValue.priceCourse,
      category: catalog,
      imageMain: formValue.imageMain,
      videoMain: formValue.videoMain,
    },
  });
  const { errors } = formState;
  let newCategory = categoryCourse?.map((item) => item.id);
  const handleOnSubmit = (data, e) => {
    e.preventDefault();
    if (isUpdateForm === false) {
      dispatch(isFillingfull({ data, id: "" }));
      dispatch(isFulled(true));
    } else {
      newCategory = [...data.category];

      dispatch(isFillingfull({ data, newCategory }));
      dispatch(isFulled(true));
    }

    dispatch(changeStep(1));
  };
  const [isChoose, setIsChoose] = useState([]);

  const handleCheckCatalog = (value) => {
    if (isChoose.includes(value)) {
      setIsChoose(isChoose.filter((val) => val !== value));
    } else {
      setIsChoose([...isChoose, value]);
    }
  };
  const isCheckboxChecked = (value) => newCategory.includes(value);
  useEffect(() => {}, []);

  return (
    <div className="w-full  border border-solid border-gray_2 py-4 rounded-[10px] px-4">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className=" flex flex-col ">
          <label className="font-bold">Name Course</label>
          <input
            name="nameCourse"
            {...register("nameCourse")}
            type="text"
            className=" border border-solid border-gray-500 rounded-md py-1 px-2 mt-2"
            placeholder="Name...."
          />
          <div className="text-left  text-red-500">
            {errors.nameCourse?.message}
          </div>
        </div>
        <div className=" flex flex-col mt-4">
          <label className="font-bold">Description Course</label>
          <div className="mt-2">
            <input
              name="description"
              {...register("description")}
              type="text"
              className="mt-2 border border-solid border-gray-500 rounded-md px-2 pb-8 w-full"
            />
          </div>
          <div className="text-left  text-red-500">
            {errors.description?.message}
          </div>
        </div>
        <div className=" flex flex-col mt-4">
          <label className="font-bold">
            What will students learn in your course
          </label>
          <Controller
            name="outCome"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextEditor onChange={onChange} value={value} />
            )}
          />

          <div className="text-left  text-red-500">
            {errors.outCome?.message}
          </div>
        </div>
        <div className="flex justify-between">
          <div className=" flex flex-col mt-4 w-[45%]">
            <label className="font-bold">Price</label>
            <input
              name="priceCourse"
              {...register("priceCourse")}
              type="text"
              className="mt-2 border border-solid border-gray-500 rounded-md px-2 py-1"
            />
            <div className="text-left  text-red-500">
              {errors.priceCourse?.message}
            </div>
          </div>
          <div className=" flex flex-col mt-4 w-[45%]">
            <label className="font-bold">Category</label>
            <div name="category">
              {" "}
              {catalog &&
                catalog.map((catl) => (
                  <>
                    <div className="inline-block mr-2 mt-1 px-2 py-1 mb-2 border !border-gray-500 border-solid whitespace-nowrap rounded-lg hover:bg-black hover:text-white input-wrapper">
                      <label key={catl.id} htmlFor={catl.name}>
                        {catl.name}
                      </label>
                      <input
                        defaultChecked={isCheckboxChecked(catl.id)}
                        className="appearance-none "
                        type="checkbox"
                        {...register("category")}
                        id={catl.name}
                        value={catl.id}
                        onChange={() => handleCheckCatalog(catl.id)}
                      />
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className=" mt-4 flex justify-between h-full">
          <div className="w-[40%] h-full ">
            <p className="font-bold mb-2">Image Main</p>
            <Controller
              name="imageMain"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InforImage onChange={onChange} value={value} />
              )}
            />
            <div className="text-left  text-red-500">
              {errors.imageMain?.message}
            </div>
          </div>
          <div className="w-[55%] h-full">
            <p className="font-bold mb-2">Video</p>
            <Controller
              name="videoMain"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InforVideo onChange={onChange} value={value} />
              )}
            />
            <div className="text-left  text-red-500">
              {errors.videoMain?.message}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="border border-solid border-black px-3 py-1 rounded-lg disabled:text-gray_3 disabled:border-gray_3 "
            disabled={!formState.isValid}
          >
            Next
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </div>
  );
}

export default Information;
