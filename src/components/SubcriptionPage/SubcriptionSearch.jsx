import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Select, Space } from "antd";

export default function SubcriptionSearch() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="mx-9 mt-4 mb-2 h-[20%] px-5 bg-gray-200 rounded-[15px]">
      <div className="font-semibold text-2xl mb-2">Filter by</div>
      <div className="flex ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search...."
            className="bg-white px-12 py-2 rounded-[5px] placeholder-slate-400"
          />
          <FontAwesomeIcon
            className="absolute z-50 top-[50%] left-2 translate-y-[-50%]"
            icon={faMagnifyingGlass}
            style={{ color: "#969696" }}
          />
        </div>
        <div className="ml-8 rounded-2xl">
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
              height: 40,
            }}
            className="!rounded-2xl"
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
