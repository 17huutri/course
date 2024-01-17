import React from "react";
import { useSelector } from "react-redux";

function ProfilePageNav({ text }) {
  const { profile } = useSelector((state) => state.userReducer);

  return (
    <div className="w-full px-10 bg-white shadow-box_shadow_6">
      <div className="w-full h-[80px] flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-3xl">{text}</h1>
        </div>
        <div className="  rounded-full cursor-pointer flex items-center gap-4">
          <img
            className="rounded-full w-[50px] h-[50px]"
            src={profile?.image}
            alt="Avatar"
          />

        </div>
      </div>
    </div>
  );
}

export default ProfilePageNav;
