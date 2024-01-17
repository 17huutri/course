import {
  faBookOpen,
  faHouse,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import storageService from "../../api/storageService";
import { useDispatch, useSelector } from "react-redux";
import accountSlice, {
  setIsLogin,
  setRole,
} from "../../store/slices/accountSlice";
import { isCancelForm } from "../../store/slices/courseSlice/createCourseSlice";

function Navigation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.accountReducer);

  const handleLogout = () => {
    storageService.removeAccessToken();
    dispatch(setIsLogin(false));
    dispatch(setRole(""));
    storageService.removeRole();

    navigate("/");
    window.location.reload();
  };

  const handleCancelForm = () => {
    dispatch(isCancelForm());
  };

  return (
    <div className="bg-black px-[25px] py-3 flex flex-col h-full">
      <NavLink to="/instructor" className="flex items-center">
        <h1 className="text-white text-[25px] font-semibold font-sans">
          Code It.
        </h1>
      </NavLink>
      <div className=" pt-[25px] flex items-start flex-grow flex-col gap-6">
        <NavLink
          to="/instructor/home"
          className={`flex px-[20px] py-[10px]   items-center w-full ${
            location.pathname === "/instructor/home"
              ? " bg-background_2 text-white rounded-[10px] relative after:absolute after:right-[-25px] after:w-[5px] after:h-[80%] after:bg-background_2 after:rounded-tl-[20px] after:rounded-bl-[20px] "
              : "text-white "
          }`}
        >
          <HomeOutlined className="pr-2 text-[22px]" />

          <p className="text-[18px] z-20">Home</p>
        </NavLink>

        <NavLink
          to="/instructor/profile"
          className={`flex px-[20px] py-[10px]   items-center w-full ${
            location.pathname === "/instructor/profile"
              ? " bg-background_2 text-white rounded-[10px] relative after:absolute after:right-[-25px] after:w-[5px] after:h-[80%] after:bg-background_2 after:rounded-tl-[20px] after:rounded-bl-[20px] "
              : "text-white "
          }`}
        >
          <UserOutlined className="pr-2  text-[22px]" />

          <p className="text-[18px] z-20">Your Profile</p>
        </NavLink>
        <NavLink
          onClick={handleCancelForm}
          to="/instructor/catalog"
          className={`flex px-[20px] py-[10px]  items-center w-full ${
            location.pathname === "/instructor/catalog"
              ? "bg-background_2 text-white rounded-[10px]  relative after:absolute after:right-[-25px] after:w-[5px] after:h-[80%] after:bg-background_2 after:rounded-tl-[20px] after:rounded-bl-[20px] "
              : "text-white "
          }`}
        >
          <FontAwesomeIcon className="pr-2 text-[20px]" icon={faBookOpen} />

          <p className="text-[18px] z-20">Catalogs</p>
        </NavLink>
      </div>
      <button
        onClick={handleLogout}
        className="text-white  px-[20px] py-[25px] flex items-center"
      >
        <FontAwesomeIcon
          className="pr-2  text-[22px]"
          icon={faRightFromBracket}
        />
        <p className="text-[18px]">Log Out</p>
      </button>
    </div>

  );
}

export default Navigation;
