import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstructorCard = () => {
  return (
    <div className="w-1/3 text-center shadow-box_shadow_1">
      <div className="card-content bg-gray_1 w-full px-4 py-6">
        <div className="w-1/3 m-auto ">
            <img src="/assests/images/homepages/avt.png" alt="" className="rounded-full" />
        </div>
        <h2 className="mb-1 mt-3 font-bold text-xl">Instructors name</h2>
        <div className="flex justify-center mb-5">
          <div className="text-yellow-400 font-bold flex">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <p className="mb-5">
          <q className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
            n
          </q>
        </p>
        <button type="submit" className="!bg-black text-white py-1 px-5 rounded-xl">Subcribe</button>
      </div>
    </div>
  );
};

export default InstructorCard;
