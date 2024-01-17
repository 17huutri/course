import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../../../api/storageService";
import { setIsLogin, setRole } from "../../../store/slices/accountSlice";
import { fetchUserProfile } from "../../../store/slices/userSlice";

function ProfileDropdown() {
  const [isDropdown, setIsDropdown] = useState(false);
  const { role } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleLogout = () => {
    storageService.removeAccessToken();
    dispatch(setIsLogin(false));
    dispatch(setRole(""));
    storageService.removeRole();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <>
      <div
        onClick={handleDropdown}
        className="w-12 h-12 bg-black rounded-full relative cursor-pointer z-40 md:block hidden"
      >
        <img
          className="rounded-full w-full h-full"
          src={profile?.image}
          alt="Avatar"
        />
        {isDropdown && (
          <div className="z-10 absolute -bottom-20 right-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 ">
            <ul
              className="py-2 text-sm text-gray-700 flex flex-col justify-between"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="block text-center h-1/2 hover:text-blue-500">
                <Link to="/profile">Profile</Link>
              </li>

              <li className="block h-1/2 hover:text-blue-500 ">
                <button onClick={handleLogout} className="px-4 py-2 w-full ">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileDropdown;
