import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faL,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import ProfileDropdown from "../Header/ProfileDropdown/ProfileDropdown";
import { Link, NavLink, useLocation } from "react-router-dom";
import CatalogNav from "./CatalogNav/CatalogNav";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/slices/cartSlice";
import NavbarMobile from "./NavbarMobile";
import AutocompleteSearch from "./AutocompleteSearch";

export default function Navigation2() {
  const dispatch = useDispatch();
  const { totalQuantity, coursesInOrder } = useSelector(
    (state) => state.cartReducer
  );
  const { catalog } = useSelector((state) => state.courseReducer);
  const location = useLocation();
  const decodedCurrentPath = decodeURIComponent(location.pathname);
  const [showNav, setShowNav] = useState(false);

  const menuItems = catalog?.map((catl) => ({
    key: catl.id,
    label: (
      <Link
        key={catl.id}
        to={`courses/${catl.name.replace(/ /g, "-")}`}
        className={`px-3 lg:text-[16px] text-[14px] ${
          decodedCurrentPath.includes(catl.name.replace(/ /g, "-"))
            ? "text-[#4752a5] font-semibold"
            : ""
        }`}
      >
        {catl.name}
      </Link>
    ),
  }));
  const menuCatalog = (
    <Menu>
      {menuItems?.map((item) => (
        <Menu.Item key={item.key} disabled={item.disabled} danger={item.danger}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  //handle
  const handleShowMobileNav = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <div className="md:bg-white bg-black flex md:py-2 py-3 relative  items-center justify-between  md:border-b border-solid border-gray_2 px-4">
        <Link to="/" className="md:block hidden w-[148px] ">
          <img
            src="/assests/images/LogoDesktop.png"
            alt="logo"
            className="w-full h-full"
          />
        </Link>
        <FontAwesomeIcon
          className={`md:hidden block  ${
            showNav ? "text-purple_1" : "text-white"
          }`}
          onClick={() => handleShowMobileNav()}
          icon={faBars}
        />
        <NavbarMobile show={showNav} handleMobileNav={handleShowMobileNav} />
        <Dropdown className="md:hidden 2 block" overlay={menuCatalog}>
          <p className="hover:text-purple_1 text-white">Categories</p>
        </Dropdown>
        {/* xl:w-[500px] lg:w-[450px] md:w-[350px] w-[200px] */}

        <div className="relative md:block hidden w-[40%]">
          <AutocompleteSearch />
        </div>

        <div className="flex items-center lg:gap-8 gap-4">
          <ul className="  items-center md:flex hidden  text-[17px] font-normal    ">
            <li>
              <NavLink
                to="/studyingcourse"
                className={` ${
                  location.pathname === "/studyingcourse"
                    ? " bg-blue_5 p-2 text-white rounded-[15px] relative after:absolute after:bottom-[-7px] after:left-[50%] after:translate-x-[-50%] after:transform after:rotate-45  after:w-[15px] after:h-[15px] after:bg-blue_5 "
                    : "p-2 text-black "
                }`}
              >
                Studying Progress
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/subcription"
                className={` lg:block hidden ${
                  location.pathname === "/subcription"
                    ? " bg-blue_5 p-2 text-white rounded-[15px] relative after:absolute after:bottom-[-7px] after:left-[50%] after:translate-x-[-50%] after:transform after:rotate-45  after:w-[15px] after:h-[15px] after:bg-blue_5 "
                    : "p-2 text-black "
                }`}
              >
                Subcription
              </NavLink>
            </li> */}
          </ul>
          <div className="flex items-center gap-5">
            <Link to="/cart" className="block relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-[20px] md:text-black text-white block "
              />
              <p className="text-[10px] w-4 h-4 flex justify-center items-center bg-red-500 text-white rounded-full p-[2px] absolute -top-2 -right-2">
                {totalQuantity}
              </p>
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {!location.pathname.includes("/studyingcourse") &&
      !location.pathname.includes("/courses/course-detail") &&
      location.pathname !== "/profile" ? (
        <CatalogNav />
      ) : (
        ""
      )}
    </>
  );
}
