import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarCheck,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCartS, add_to_cart } from "../../store/slices/cartSlice";
import { message } from "antd";
export default function CardDetail({ course }) {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.accountReducer);
  const { coursesInOrder } = useSelector((state) => state.cartReducer);
  const handleEnrollClick = () => {
    if (isLogin) {
      dispatch(addToCartS(course.id));
    } else {
      info();
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("You need to Login before enroll");
  };

  return (
    <div className=" flex flex-col justify-center px-4 bg-gray-100 pt-6 pb-5 border rounded font-medium">
      {contextHolder}
      <div className="flex justify-between">
        <div className="mb-5">
          <FontAwesomeIcon
            icon={faBook}
            style={{ color: "#DB6B04", marginRight: "8px" }}
          />
          Total section:
        </div>
        <div> 10 sections</div>
      </div>

      <div className="flex justify-between">
        <div className="mb-5">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            style={{ color: "#DC0000", marginRight: "8px" }}
          />
          Test:
        </div>
        <div> 3 tests</div>
      </div>
      <div className="flex justify-between">
        <div className="mb-5">
          <FontAwesomeIcon
            icon={faClock}
            style={{ color: "#DBC500", marginRight: "8px" }}
          />
          Total time:
        </div>
        <div> 3h 10min</div>
      </div>
      <div className="flex justify-between">
        <div className="mb-5">
          <FontAwesomeIcon
            icon={faUsers}
            style={{ color: "#02CD3B", marginRight: "8px" }}
          />
          Enrolled:
        </div>
        <div> 90</div>
      </div>

      <button
        onClick={handleEnrollClick}
        className="bg-blue-600 text-white border rounded p-2"
      >
        Enroll
      </button>
    </div>
  );
}
