import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckoutItems,
  createPaymentURLThunk,
} from "../../store/slices/paymentSlice";

export default function InfoCart({ totalPrice }) {
  const { paymentCart, amount } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const handleCreateCheckout = () => {
    const courseId = paymentCart.map((item) => item.courseID);
    const itemsToCheckout = {
      amount: amount * 20000,
      courseId: courseId,
    };
    console.log(itemsToCheckout);
    dispatch(createPaymentURLThunk(itemsToCheckout));
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[16px] pb-[5%] border-b border-solid border-gray_2">
        Order Info
      </h1>
      <div className="flex justify-between py-2">
        <h1 className="text-[#414141d4] font-medium text-[25px]">Total</h1>
        <h1 className="text-[25px] text-[#15579d] font-bold">{totalPrice} $</h1>
      </div>
      <button
        className={` text-white p-2 text-[20px] ${
          paymentCart.length === 0
            ? "bg-gray-300"
            : "bg-blue_5 hover:bg-blue-500"
        } font-medium rounded-[5px]`}
        onClick={handleCreateCheckout}
        disabled={paymentCart.length === 0}
      >
        Submit
      </button>
    </div>
  );
}
