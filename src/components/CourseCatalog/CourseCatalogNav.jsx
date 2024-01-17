import React from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CourseCatalogNav() {
    return (
        <div className="w-[94%] m-auto">
            <div className="w-full h-[80px] flex items-center border-b-2 border-solid border-slate-400" >
                <div className="m-auto relative flex items-center">
                    <button
                        type="submit"
                        className="absolute ml-4 text-slate-400 hover:text-black"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input
                        type="text"
                        placeholder="Search...."
                        className="bg-gray-200 px-12 py-2 rounded-3xl placeholder-slate-400 focus:outline-none"
                        style={{ zIndex: 99 }}


                    />
                </div>
            </div>

        </div>
    );
};
