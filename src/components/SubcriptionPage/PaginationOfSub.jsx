import React from "react";
import { Pagination } from "antd";
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

export default function PaginationOfSub() {
  return (
    <>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
    </>
  );
}
