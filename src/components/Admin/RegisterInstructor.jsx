import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import schemaRegister from "../../YupGlobal/schemaYup/registerYup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { registerInstructor } from "../../store/slices/adminSlice";

export default function RegisterInstructor({ onCancel }) {
  const dispatch = useDispatch();

  const registerFailNotify = () => toast.error("Register Fail!!!");

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    const { firstName,lastName,username, email, password, phoneNumber,career } = data;
    console.log(data);

    const account = {
      firstName,
      lastName,
      username,
      password,
      email,
      address: " ",
      phoneNumber,
      career,
      bio:" ",

    };

    try {
      const res = await dispatch(registerInstructor(account));
      // const res = await accountApi.registerInstructor(account);
      // console.log(res);

      reset();
      onCancel();
    } catch (error) {
      registerFailNotify();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4  mb-4 ">
        <input
              className={`${
                errors.firstName ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="First Name"
              name="firstName"
              {...register("firstName")}
            />
            <input
              className={`${
                errors.email ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="Last Name"
              name="lastName"
              {...register("lastName")}
            />
        </div>
        <div>
          <div className="relative mb-4 ">
            <input
              className={`${
                errors.username ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="Username"
              name="username"
              {...register("username")}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faUser} className="text-gray-400" />
            </div>
          </div>
          <div className="text-left  text-red-500">
            {errors.username?.message}
          </div>
        </div>

        <div>
          <div className="relative mb-4 ">
            <input
              className={`${
                errors.email ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
            </div>
          </div>
          <div className="text-left  text-red-500">{errors.email?.message}</div>
        </div>
       
        <div>
          <div className="relative mb-4 ">
            <input
              className={`${
                errors.password ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"`}
              type="password"
              placeholder="Password"
              name="password"
              {...register("password")}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
            </div>
          </div>
          <div className="text-left  text-red-500">
            {errors.password?.message}
          </div>
        </div>
        <div>
          <div className="relative mb-4 ">
            <input
              className={`${
                errors.confirmPassword ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              {...register("confirmPassword")}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faLock} className="text-gray-400" />
            </div>
          </div>
          <div className="text-left  text-red-500">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="flex  justify-between gap-4  mb-4 ">
          <div className="relative mb-4 w-full">
            <input
              className={`${
                errors.phoneNumber ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              {...register("phoneNumber")}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
              <div className="text-left  text-red-500">
            {errors.phoneNumber?.message}
          </div>
            </div>
          </div>
          <input
              className={`${
                errors.career ? "is-invalid" : ""
              } w-full h-[45px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
              type="text"
              placeholder="Career"
              name="career"
              {...register("career")}
            />
        </div>

        <button
          className="w-full h-[45px] mt-4 rounded-[6px]  !bg-black text-white text-2xl font-semibold "
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
