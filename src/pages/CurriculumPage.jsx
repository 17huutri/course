import React from "react";
import ProfilePageNav from "../components/ProfilePage/ProfilePageNav";
import Curriculum from "../components/Instructor/CreatCourse/Curriculum";

function CurriculumPage() {
  return (
    <div>
      {" "}
      <div className="h-full overflow-y-scroll">
        <ProfilePageNav text={"Lesson"} />
        <div className=" px-10 mt-5 pb-5">
          <div className=" bg-gray_1 rounded-[10px] px-4 py-10 mb-5">
            <Curriculum />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
