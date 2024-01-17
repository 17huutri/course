import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import accountApi from "../../api/accountApi";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import storageService from "../../api/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import { ROLE } from "../../api/constant_api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { clearCourses } from "../../store/slices/courseSlice/courseSlice";

export default function Login() {
  const { role } = useSelector((state) => state.accountReducer);
  const [message, setMessage] = useState("");

  const form = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleToken = ROLE;

  const loginSuccessNotify = () => toast.success("Login Successfully!!!");
  const loginFailNotify = () => {
    toast.error(message[0]);
  };
  const onSubmit = async (data) => {
    try {
      const res = await accountApi.login(data);
      if (res) {
        console.log(res.data._data);
        let unDecodeToken = res.data._data.accessToken;
        storageService.setAccessToken(unDecodeToken);
        const token = jwtDecode(unDecodeToken);
        loginSuccessNotify();
        dispatch(setIsLogin(true));
        dispatch(setRole(token[roleToken]));
        storageService.setRole(token[roleToken]);
        if (role === "Instructor") {
          navigate("/instructor");
        } else if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setMessage(error.response.data._message);
      loginFailNotify();
    }
  };

  const onGoogle = async (data) => {
    // console.log(data);
    try {
      const res = await accountApi.loginWithGoogle({ token: data });
      if (res) {
        // console.log(res);
        let unDecodeToken = res.data._data.accessToken;
        storageService.setAccessToken(unDecodeToken);
        const token = jwtDecode(unDecodeToken);
        loginSuccessNotify();
        dispatch(setIsLogin(true));
        dispatch(setRole(token[roleToken]));
        storageService.setRole(token[roleToken]);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen bg-blue_1">
      <Link to="/">
        {" "}
        <img
          alt=""
          src="/assests/images/Code_IT-removebg-preview.png"
          className="absolute w-32 z-10"
        />
      </Link>
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "35%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className=" float-left flex justify-center h-screen w-4/6 bg-white rounded-l-[80px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-32 ">
              <h1 className="text-4xl mx-auto my-0 mb-8 font-bold">Login</h1>
              <div className="relative mb-2">
                <input
                  className="w-[400px] h-[50px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
              </div>
              {errors.email && (
                <div className="text-left  text-red-500">
                  Email is required !!!
                </div>
              )}

              <div className="relative mb-2">
                <input
                  className="w-[400px] h-[50px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
              </div>
              {errors.password && (
                <div className="text-left  text-red-500">
                  Password is required !!!
                </div>
              )}
              <Link to="/forgotpassword">
                <p className="mb-4 text-blue_4 text-sm">
                  Forgot your password?
                </p>
              </Link>
              <button
                className="w-[400px] h-[50px] rounded-[6px]  !bg-black text-white text-2xl font-semibold "
                type="submit"
              >
                Login
              </button>
              <span className="my-6 mx-auto text-text_color_base">Or</span>
              <div className="grid  gap-6">
                <GoogleOAuthProvider
                  clientId="888621486901-lvcuuegg6jtv27vqesgaeg7b3l34agob.apps.googleusercontent.com"
                  className="w-full"
                >
                  <GoogleLogin
                    className="w-full"
                    onSuccess={(credentialResponse) =>
                      onGoogle(credentialResponse.credential)
                    }
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
              <p className="mx-auto my-6">
                Don't you have account?{" "}
                <Link to="/register" className="text-blue-800">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div
        className="relative w-2/6  h-screen float-right"
        initial={{ x: "0", opacity: 1 }}
        animate={{ x: "-135%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <img
          alt=""
          src="/assests/images/login_page/login3D.png"
          className="absolute w-[550px] top-3/4 right-1/4 transform -translate-y-3/4"
        />
      </motion.div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
