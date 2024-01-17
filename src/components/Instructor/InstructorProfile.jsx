import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instructorApi from "../../api/instructorApi";

function InstructorProfile() {
    const { instructorId } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        instructorApi
            .get_intructor_profile(instructorId)
            .then((response) => {
                setProfile(response.data._data);
            })
            .catch((error) => {
                console.error("Error fetching instructor profile: ", error);
            });
    }, [instructorId]);

    return (
        <div className="flex px-20 py-10 h-5/6">
            {profile ? (
                <>
                    <div className="w-3/4">
                        Mentor:<h2 className="text-2xl font-bold mb-4">

                            {profile.lastName} {profile.firstName}
                        </h2> About me:
                        <p className="text-gray-600 mb-4">
                            {profile.career}</p>
                    </div>
                    <div className="w-1/4">
                        <img
                            src={profile.image}
                            className="rounded-full w-40 h-40 mx-auto mb-4"
                        />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default InstructorProfile;
