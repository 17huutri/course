import React, { useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
export default function SmallContent() {
  const { courseDetail } = useSelector((state) => state.courseReducer);
  return (
    <div className="px-36 py-10">
      <h1 className="text-5xl pb-8 font-semibold text-black">Description</h1>
      <p>{courseDetail?.description}</p>
      <h2 className="text-2xl py-7 font-medium">What is Included</h2>
      <p dangerouslySetInnerHTML={{ __html: courseDetail?.outcome }} />
    </div>
  );
}
