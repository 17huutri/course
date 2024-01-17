import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";

function Header() {
  const { isLogin } = useSelector((state) => state.accountReducer);

  return (
    <div className="bg-transparent z-50 fixed top-0 left-0 w-full  ">
      <div className="flex lg:justify-between sm: justify-end py-1 lg:px-8 sm: px-4 items-center">
        <div className="w-32 h-20 rounded-full lg:block sm: hidden">
          <Link to="/">
            <img
              className="w-full rounded-full"
              src="/assests/images/Code_IT-removebg-preview.png"
              alt=""
              style={{ position: "relative", top: "-30%" }}
            />
          </Link>
        </div>

        <div>
          {isLogin ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login">
              <button className="bg-black text-white py-2 px-4 text-[16px] rounded-3xl">
                Get started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
