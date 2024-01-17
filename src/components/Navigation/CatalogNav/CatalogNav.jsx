import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function CatalogNav() {
  const { catalog } = useSelector((state) => state.courseReducer);
  const location = useLocation();
  const decodedCurrentPath = decodeURIComponent(location.pathname);
  return (
    <>
      <div className="md:flex hidden justify-center items-center  py-4 shadow-box_shadow_5 text-[#00000099] relative z-10">
        {catalog &&
          catalog.map((catl) => (
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
          ))}
      </div>
    </>
  );
}

export default CatalogNav;
