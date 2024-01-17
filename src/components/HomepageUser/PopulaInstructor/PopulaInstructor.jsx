import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InstructorCard from "./InstructorCard";

const PopulaInstructor = () => {
  return (
    <div className="px-10 m-auto mt-12 pb-5">
      <div className="w-[90%] m-auto">
        <div className="flex justify-between mb-5">
          <h1 className="font-bold text-3xl text-blue_3 mb-2">
            Popular Instructors
          </h1>

          <div className="mb-2 mt-3">
            <a className="cursor-pointer font-bold mr-2">View all</a>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex gap-3">
          <InstructorCard />
          <InstructorCard />
          <InstructorCard />
        </div>
      </div>
    </div>
  );
};
export default PopulaInstructor;
