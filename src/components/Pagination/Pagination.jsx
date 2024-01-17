import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  increDecrePage,
  setCurrentPage,
} from "../../store/slices/courseSlice/courseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination({ totalPage, handlePageChange }) {
  const currentPage = useSelector((state) => state.courseReducer.currentPage);
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (currentPage > 1) {
      dispatch(increDecrePage());
      handlePageChange(currentPage - 1);
    }
  };

  const handleIncrease = () => {
    if (currentPage < totalPage) {
      dispatch(increDecrePage());
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 text-neutral-500 font-semibold py-4">
      <button
        onClick={handleDecrease}
        className={`block px-2 rounded-sm text-neutral-500 ${currentPage <= 1 ? "text-neutral-300" : ""
          }`}
        disabled={currentPage <= 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {[...Array(totalPage)].map((_, i) => (
        <button
          key={i}
          onClick={() => {
            dispatch(setCurrentPage(i + 1));
            handlePageChange(i + 1);
          }}
          className={`block px-2 rounded-sm ${currentPage === i + 1
              ? "text-white bg-blue-500"
              : "text-neutral-500"
            }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={handleIncrease}
        className={`block px-2 rounded-sm text-neutral-500 ${currentPage >= totalPage ? "text-neutral-300" : ""
          }`}
        disabled={currentPage >= totalPage}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
