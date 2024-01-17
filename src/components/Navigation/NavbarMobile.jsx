import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import storageService from "../../api/storageService";
import AutocompleteSearch from "./AutocompleteSearch";

export default function NavbarMobile({ show, handleMobileNav }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    storageService.removeAccessToken();
    dispatch(setIsLogin(false));
    dispatch(setRole(""));
    storageService.removeRole();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={` absolute top-[97%]   w-[200px] h-screen z-[300] bg-black text-white transition-all duration-1000   ${
        show ? "left-0 md:hidden block" : "left-[-100%]"
      }`}
    >
      <AutocompleteSearch />
      <ul className="w-full h-full flex flex-col items-start px-4 py-4 gap-y-4">
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <Link to="/">
            <p>Home</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px] "
          onClick={handleMobileNav}
        >
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px] "
          onClick={handleMobileNav}
        >
          <p>Categories</p>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <Link to="/studyingcourse">
            <p>Studying Course</p>
          </Link>
        </li>
        <li
          className="hover:bg-background_2 w-full px-2 py-1 rounded-[5px]"
          onClick={handleMobileNav}
        >
          <button onClick={handleLogout} className=" w-full text-left">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
