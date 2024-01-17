import React, { useEffect } from "react";
// import { getInforIns } from "../../store/slices/cartSlice";
import instructorApi from "../../api/instructorApi";
import { useState } from "react";
function InstructorCart({ instructorID }) {
  const [instructor, setInstructor] = useState();

  const fetchInstructor = async () => {
    if (instructorID) {
      try {
        const res = await instructorApi.get_intructor_profile(instructorID);
        setInstructor(res.data._data);
        return res;
      } catch (error) {
        throw error;
      }
    }
  };
  useEffect(() => {
    fetchInstructor();
  }, []);
  return <>{instructor && `${instructor.firstName} ${instructor.lastName}`}</>;
}

export default InstructorCart;
