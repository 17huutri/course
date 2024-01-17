import { Circle } from "rc-progress";
import React from "react";

export default function ProgressCircle({ width, height, progress }) {

  return (
    <div className="z-10 relative">
      <Circle
        percent={progress}
        strokeWidth={2}
        trailWidth={2}
        strokeColor={progress === 100 ? "#7bddbf" : "#e1312a"}
        className={`h-[${height}px] w-[${width}px] `}
      />
      <div
        className={`  ${
          progress === 100 ? "bg-[#85d9bf5e]" : "bg-[#ffcece8f]  "
        } flex items-center justify-center absolute top-1/2 left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[55px] h-[55px]`}
      >
        <p className="text-[13px] text-white">{progress}%</p>
      </div>
    </div>
  );
}
