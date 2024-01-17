import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import accountApi from "../../api/accountApi";
import schemaRegister from "../../YupGlobal/schemaYup/registerYup";

export default function Register() {
  const registerSuccessNotify = () => toast.success("Register Successfully!!!");

  const registerFailNotify = () => toast.error("Register Fail!!!");

  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    const { username, email, password, phoneNumber } = data;
    console.log(data);

    const account = {
      username,
      password,
      email,
      address: " ",
      phoneNumber,
    };

    try {
      const res = await accountApi.registerUser(account);
      console.log(res);
      registerSuccessNotify();
      reset();
      navigate("/login");
    } catch (error) {
      registerFailNotify();
    }
  };

  return (
    <div className="relative h-screen  bg-blue_1">
      <Link to="/">
        {" "}
        <img
          src="/assests/images/Code_IT-removebg-preview.png"
          className="absolute w-32 z-10"
          alt=""
        />
      </Link>
      <motion.div
        className="relative w-2/6 h-full float-left z-10"
        initial={{ x: "0", opacity: 1 }}
        animate={{ x: "135%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <img
          src="/assests/images/login_page/login3D.png"
          className="absolute w-[550px] top-3/4 left-1/4 transform -translate-y-3/4 "
          alt=""
        />
      </motion.div>

      <motion.div
        initial={{ x: "0", opacity: 1 }}
        animate={{ x: "-35%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className=" float-right flex justify-center h-screen w-4/6 bg-white rounded-r-[80px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-32 ">
              <h1 className="text-4xl mb-8 font-bold">Create Account</h1>
              <div>
                <div className="relative mb-4 ">
                  <input
                    className={`${
                      errors.username ? "is-invalid" : ""
                    } w-[400px] h-[45px] bg-gray_2 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
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
                    } w-[400px] h-[45px] bg-gray_2 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
                    type="text"
                    placeholder="Email"
                    name="email"
                    {...register("email")}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
                  </div>
                </div>
                <div className="text-left  text-red-500">
                  {errors.email?.message}
                </div>
              </div>
              <div>
                <div className="relative mb-4 ">
                  <input
                    className={`${
                      errors.phoneNumber ? "is-invalid" : ""
                    } w-[400px] h-[45px] bg-gray_2 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    {...register("phoneNumber")}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                  </div>
                </div>
                <div className="text-left  text-red-500">
                  {errors.phoneNumber?.message}
                </div>
              </div>
              <div>
                <div className="relative mb-4 ">
                  <input
                    className={`${
                      errors.password ? "is-invalid" : ""
                    } w-[400px] h-[45px] bg-gray_2 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"`}
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
                    } w-[400px] h-[45px] bg-gray_2 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400`}
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

              <button
                className="w-[400px] h-[45px] mt-4 rounded-[6px]  !bg-black text-white text-2xl font-semibold "
                type="submit"
              >
                Sign up
              </button>

              <p className="mx-auto my-6">
                Already have a account?{" "}
                <Link to="/login" className="text-blue-800">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      <div>
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </div>
  );
}
