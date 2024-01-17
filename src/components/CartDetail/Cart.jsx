import React, { useEffect } from "react";
import InfoCart from "./InfoCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  calAmount,
  deleteCartItem,
  selectAllToPayment,
  toggleSelectToPayment,
} from "../../store/slices/cartSlice";
import InstructorCart from "./InstructorCart";

export default function Cart() {
  const dispatch = useDispatch();
  const {
    coursesInOrder,
    totalQuantity,
    paymentCart,
    paymentCartQuantity,
    amount,
  } = useSelector((state) => state.cartReducer);

  const { paymentURL } = useSelector((state) => state.paymentReducer);

  const handleDelete = (course, e) => {
    e.preventDefault();
    console.log(course);
    dispatch(deleteCartItem(course.courseID));
  };

  const handleSelect = (course) => {
    dispatch(toggleSelectToPayment({ course }));
  };

  const handleSelectAll = () => {
    dispatch(selectAllToPayment());
  };

  useEffect(() => {
    const amount = paymentCart.reduce((total, course) => {
      return total + course.price;
    }, 0);

    dispatch(calAmount(amount));
  }, [paymentCart]);

  useEffect(() => {});

  return (
    <div className="lg:px-[10%] sm: px-[20%] py-[3%] ">
      <h1 className="font-bold text-[40px] pb-[2%]">Your Cart</h1>
      <div className="grid grid-cols-10 gap-[5%] pb-[10%]">
        <div className="col-span-7">
          <div className="flex justify-between">
            <p className="font-bold text-md ">
              <input
                type="checkbox"
                checked={paymentCart.length === coursesInOrder.length}
                onClick={handleSelectAll}
              />
              <span className="ml-2">Select All</span>
            </p>
            <p className="font-bold text-md text-red-500">
              ({paymentCartQuantity}) items are selected
            </p>
            {totalQuantity > 1 ? (
              <p className="font-bold text-md">
                {totalQuantity} courses in cart
              </p>
            ) : (
              <p className="font-bold text-md">
                {totalQuantity} course in cart
              </p>
            )}
          </div>

          {coursesInOrder &&
            coursesInOrder.map((course) => (
              <div className="border-t border-solid border-gray_2 flex items-center">
                <div className="w-[10%]">
                  <input
                    type="checkbox"
                    onClick={() => handleSelect(course)}
                    checked={paymentCart.some(
                      (item) => item.courseID === course.courseID
                    )}
                  />
                </div>
                <div className="w-[90%] h-full flex items-center py-6">
                  {" "}
                  <Link
                    to={`/courses/course-detail/${course.courseID}`}
                    className="block w-40 h-full mr-6"
                  >
                    <img
                      src={course.image}
                      onClick={(e) => handleSelect(e)}
                      alt="404"
                      className="w-full h-full col-span-2"
                    />
                  </Link>
                  <div className="flex flex-col col-span-6">
                    <h1 className="font-bold text-[20px] ">
                      {course.courseName}
                    </h1>

                    <p className="text-[16px] text-[#4c4c4c]">
                      <span className="text-black font-bold">Mentor: </span>
                      <InstructorCart instructorID={course.instructorID} />
                    </p>
                    <p className="text-[#4a6412] font-normal py-[2%] ">
                      <FontAwesomeIcon className="pr-2" icon={faCheck} />
                      Total time{" "}
                      <FontAwesomeIcon className="px-2" icon={faCheck} />
                      Number Section
                    </p>
                    <p>{new Date(course.createDate).toLocaleString()}</p>
                  </div>
                  <div className="h-full flex flex-col flex-grow items-end justify-between col-span-2">
                    <FontAwesomeIcon
                      onClick={(e) => handleDelete(course, e)}
                      className="pr-2 z-10 mb-10 text-red-500 hover:text-red-400 cursor-pointer"
                      icon={faTrash}
                    />
                    <h1 className="text-[23px] mt-10 text-[#15579d] font-bold">
                      {" "}
                      {course.price.toFixed(2)} $
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="col-span-3">
          <InfoCart totalPrice={amount} />
        </div>
      </div>
    </div>
  );
}
