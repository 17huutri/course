import React from "react";

export default function VideoCourse({sectionName}){
    return(
        <div className=" border border-solid border-[#D6D6D6] rounded-[25px] bg-red-300">
          <p>Video của section: {sectionName}</p>
        </div>
    )
}