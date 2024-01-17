import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartS, deleteCartItem } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function AddToCartButton({ course }) {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.accountReducer);
  const { coursesInOrder } = useSelector((state) => state.cartReducer);
  const { yourCourse } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);
  const [isBuyed, setisBuyed] = useState(false);

  async function addToCartAsync(dispatch, course) {
    // Assume addToCartS returns a promise
    await dispatch(addToCartS(course));
  }

  async function deleteItemInCartAsync(dispatch, id) {
    // console.log(id);
    // Assume addToCartS returns a promise
    await dispatch(deleteCartItem(id));
  }

  const addToCart = async (course, role) => {
    if (role === "") {
      navigate("/login");
    } else {
      await addToCartAsync(dispatch, course);
      // Check the updated state after the asynchronous operation
      setIsInCart(true);
    }
  };

  const handleDeleteItemInCart = async (id) => {
    await deleteItemInCartAsync(dispatch, id);
    setIsInCart(false);
  };

  useEffect(() => {
    setIsInCart(coursesInOrder?.some((item) => item?.courseID === course.id));
    if (role === "User") {
      setisBuyed(yourCourse?.list?.some((item) => item.id === course.id));
    }
  }, [coursesInOrder, yourCourse]);

  if (isBuyed) {
    return (
      <button
        disabled
        className="absolute bottom-0 right-0 bg-gray-300 px-2 py-1 text-white  rounded-[5px]"
      >
        Buyed
      </button>
    );
  }

  if (isInCart) {
    return (
      <button
        key={course.courseID}
        onClick={() => handleDeleteItemInCart(course.id)}
        className="absolute bottom-0 right-0
      bg-red-600
      px-2 py-1 text-white  rounded-[5px]"
      >
        Already in Cart
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(course, role)}
      className="absolute bottom-0 right-0 bg-blue_2 px-2 py-1 text-white  rounded-[5px]"
    >
      Add to cart
    </button>
  );
}

export default AddToCartButton;
