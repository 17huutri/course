import React from "react";
import { Link } from "react-router-dom";

export default function NavDetail() {
  return (
    <>
    
        <nav className="flex space-x-8 pb-0 pt-3 h-[20%] mx-4 border-gray_2 border-b border-solid font-bold">
          <div>
            <Link to="/">
              <img
                src="/assests/images/Code_IT-removebg-preview.png"
                alt="logo"
                className="relative w-16 ml-16 translate-y-[-20%]"
              />
            </Link>
          </div>

          <div className="pl-32 translate-y-[20%]">
            <ul className="flex ">
              <Link to="/" className="px-8">
                Home
              </Link>
              <Link to="/courses" className="px-8">
                Courses
              </Link>
              <Link className="px-8">Instructors</Link>
            </ul>
          </div>
          <button className="absolute right-24  border border-solid rounded-[40px] bg-black text-white w-[8%] h-[7%]">
            Get started
          </button>
        </nav>
   
      
    </>
  );
}
