import React from "react";
import SubcriptionCard from "../components/SubcriptionPage/SubcriptionCard";
// import SubcriptionNav from "../components/SubcriptionPage/SubcriptionNav";
import SubcriptionSearch from "../components/SubcriptionPage/SubcriptionSearch";

export default function SubcriptionPage() {
  return (
    <div className="w-full  ">
      {/* <SubcriptionNav /> */}
      <SubcriptionSearch />
      <SubcriptionCard />
    </div>
  );
}
