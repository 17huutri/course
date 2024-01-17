import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiLogIn, BiSearch } from "react-icons/bi";
import { BsBook } from "react-icons/bs";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import storageService from "../../api/storageService";






const SidebarAdmin = ({ children }) => {
  //declare

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  //handle
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    storageService.removeAccessToken();
    dispatch(setIsLogin(false));
    dispatch(setRole(""));
    storageService.removeRole();

    navigate("/");

  };



  const routes = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/admin/catalogs",
      name: "Catalogs",
      icon: <BsBook />,
    },
    {

      name: "Logout",
      icon: <BiLogIn />,
      onClick: handleLogout,
    },




  ];

  return (
    <>
      <div className="flex">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="bg-blue-900 text-white h-screen overflow-y-auto"
        >
          <div class="flex items-center justify-between p-3">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="text-xl leading-0"
                >
                  Admin Dashboard
                </motion.h1>
              )}
            </AnimatePresence>

            <div class="bars w-7 h-7">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="mt-3 space-y-2">
            {routes.map((route, index) => {


              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="flex justify-items-center text-white gap-10 p-2  group transition-transform transform duration-200 ease-in-out hover:border-white hover:bg-blue-700"
                  activeClassName="border-r-4 border-transparent group-hover:border-white"
                  onClick={route.onClick}
                >


                  <div className="w-6 h-6 ml-1">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="whitespace-nowrap text-sm"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>


      </div>
    </>
  );
};

export default SidebarAdmin;