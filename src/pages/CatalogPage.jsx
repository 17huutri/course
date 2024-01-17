import React, { useState } from "react";
import CatalogNav from "../components/CatalogInstructor/CatalogNav";
import { Input, Space, Table } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import TableCourse from "../components/CatalogInstructor/TableCourse";
export default function CatalogPage() {
  //declare
  const [showForm, setShowForm] = useState(1);

  //handle
  const handleButtonClick = (value) => {
    setShowForm(value);
  };
  return (
    <div className="h-full px-8 pb-5 overflow-y-auto">
      <div className="px-2 h-[70px]">
        <CatalogNav />
      </div>
      <div className=" flex items-center justify-between pt-4 px-2">
        <ul className="flex gap-10">
          <li>
            <button
              onClick={() => handleButtonClick(1)}
              autoFocus
              className={`${
                showForm === 1 ? "bg-red_1 text-[#4B4B4B]" : ""
              } px-2 focus:outline-none cursor-pointer rounded-[10px] text-[16px] `}
            >
              Ongoing Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(2)}
              className={`${
                showForm === 2 ? "bg-red_1 text-[#4B4B4B]" : ""
              } px-2 focus:outline-none cursor-pointer rounded-[10px] text-[16px] `}
            >
              Suspended Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => handleButtonClick(3)}
              className={`${
                showForm === 3 ? "bg-red_1 text-[#4B4B4B]" : ""
              } px-2 focus:outline-none cursor-pointer rounded-[10px] text-[16px] `}
            >
              Upcoming Courses
            </button>
          </li>
        </ul>
        <Input
          size="large"
          className="w-[300px]"
          placeholder="Search by courses name"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="pt-4">
        {showForm === 1 && <TableCourse />}
        {showForm === 2 && <TableCourse />}
        {showForm === 3 && <TableCourse />}
      </div>
    </div>
  );
}
