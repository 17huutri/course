import React from "react";

export default function Overview(){
    return(
    <div className="py-4 px-4"> 
        <h1 className="font-bold text-[20px] ">Name Course Name Course Name Course Name Course</h1>
        <p className="text-[11px] py-4 text-[#616161]">Course description Course description Course description Course description</p>
        <h1 className="font-semibold text-[12px] pb-1">The course will have n sections</h1>
        <ul className="text-[11px] list-disc text-[#616161] ml-4">
            <li className="p-1">Name section 1</li>
            <li className="p-1">Name section 2</li>
            <li className="p-1">Name section 3</li>
            <li className="p-1">Name section 4</li>
        </ul>
    </div>
    )
}