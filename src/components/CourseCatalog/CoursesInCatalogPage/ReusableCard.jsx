import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate } from "antd";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartS } from "../../../store/slices/cartSlice";

export default function ReusableCard({ isLastCard, course }) {
  const dispatch = useDispatch();
  const { coursesInOrder } = useSelector((state) => state.cartReducer);
  const isCourseInCart = coursesInOrder?.some((item) => item.id === course.id);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addToCart = (course) => {
    dispatch(addToCartS(course.id));
  };
  return (
    <div
      className={` relative px-2  ${isHovered && "z-20"}`}
      onMouseEnter={handleMouseHover}
    >
      <Link to={`/courses/course-detail/${course.id}`}>
        <img
          src="/assests/images/landing_pages/land_page_2.jpg"
          className="w-full h-full object-cover"
          alt="img"
        />
      </Link>
      <div className="py-2">
        <h1 className="text-[20px] font-semibold">{course.name}</h1>
        <p className="text-[11px] text-text_color_base">
          {course.instructor.firstName} {course.instructor.lastName}
        </p>
        <div className="flex items-center text-[14px]">
          <p className="pr-2">{course.avgRate}</p>
          <Rate
            className="text-[14px]"
            disabled
            allowHalf
            defaultValue={course.avgRate}
          />
        </div>
        <h1 className="text-blue-400 font-bold">
          {" "}
          {course.price.toFixed(2)} $
        </h1>
      </div>
      {isHovered && (
        <div
          onMouseLeave={handleMouseLeave}
          className="
         z-[9999] p-4  absolute top-0 left-0 bg-black bg-opacity-100 rounded-[10px]"
        >
          <div className="flex gap-4">
            {" "}
            <h2 className="font-bold text-xl text-white pb-2">
              {course.name}
            </h2>{" "}
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="pr-[5%] text-blue-600   text-[20px]"
            />
          </div>

          <p className="font-semibold text-[13px] text-[#b9ff00]">
            <span className="text-[#88b85c]">Đã cập nhật</span> tháng 13 năm
            2023
          </p>
          <p className="text-[#ffffffd9] text-[13px] pb-[10%]">
            Total time 10 hours
          </p>
          <ul className="text-[15px] text-white">
            <li className="pb-[5%] line-clamp-3">
              <FontAwesomeIcon icon={faCheck} className="pr-[5%] text-[20px]" />
              Outcome of course Outcome of course Outcome of course Outcome of
              course
            </li>
            <li className="pb-[5%] line-clamp-3">
              <FontAwesomeIcon icon={faCheck} className="pr-[5%] text-[20px]" />
              Outcome of course Outcome of course Outcome of course Outcome of
              course
            </li>
            <li className="pb-[5%] line-clamp-3">
              <FontAwesomeIcon icon={faCheck} className="pr-[5%] text-[20px]" />
              Outcome of course Outcome of course Outcome of course Outcome of
              course
            </li>
          </ul>
          <div
            onClick={() => addToCart(course)}
            className={`cursor-pointer text-white flex items-center justify-center ${
              isCourseInCart ? "bg-red-600" : "bg-blue-600"
            } px-4 py-2 rounded-[5px]`}
          ></div>
        </div>
      )}
    </div>
  );
}
