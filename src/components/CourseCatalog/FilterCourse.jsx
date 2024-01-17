import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setFilter,
} from "../../store/slices/courseSlice/courseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

function FilterCourse() {
  const dispatch = useDispatch();
  const courseSort = useSelector((state) => state.courseReducer.courseSort);

  const handleFilterChange = (newSort) => {
    dispatch(setFilter(newSort));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="ml-12 mb-4">
      <label
        htmlFor="filter"
        className="block text-gray-600 text-lg font-medium mb-2"
      >
        <FontAwesomeIcon icon={faSort} /> Sort by:
      </label>
      <select
        id="filter"
        value={courseSort}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="0" className="text-lg">
          Top Rate
        </option>
        <option value="1" className="text-lg">
          A-Z
        </option>
        <option value="2" className="text-lg">
          Z-A
        </option>
        <option value="3" className="text-lg">
          Newest
        </option>
        <option value="4" className="text-lg">
          Oldest
        </option>
      </select>
    </div>
  );
}

export default FilterCourse;
