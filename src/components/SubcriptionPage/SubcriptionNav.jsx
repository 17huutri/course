import React from "react";
const SubcriptionNav = () => {
  return (
    <div className="w-[94%] h-[10%] m-auto">
      <div className="w-full h-[80px] flex justify-between items-center border-b-2 border-solid border-slate-400 ">
        <div>
          <h1 className="font-bold text-2xl">Subscription</h1>
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

export default SubcriptionNav;
