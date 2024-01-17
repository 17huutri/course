import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const HomepageNav = () => {
  return (
    <div className="px-10 m-auto">
      <div className="w-full h-[70px]  flex items-center border-b border-solid border-gray_2">
        <div className=" m-auto relative flex items-center">
          <button
            type="submit"
            className="absolute ml-4 text-slate-400 hover:text-black"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            placeholder="Search...."
            className="bg-gray_2 px-12 py-2 rounded-3xl placeholder-slate-400"
          />
        </div>

        <div className="h-3/5">
          <img
            src="/assests/images/homepages/avt.png"
            alt=""
            className="h-full w-full rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HomepageNav;
