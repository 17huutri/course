import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

function InforVideo({ onChange, value }) {
  const { formValue } = useSelector((state) => state.createCourseReducer);
  const [video, setVideo] = useState(null);
  const [invalidVideo, setInvalidVideo] = useState(true);
  const handleVideoError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    e.currentTarget.style = "display:none";
    setInvalidVideo(true);
  };
  const handleVideoChange = (video) => {
    onChange(video);
    setVideo(video.target.value);
    setInvalidVideo(false);
  };
  useEffect(() => {
    setVideo(formValue.videoMain);
  }, [formValue]);
  return (
    <div className="flex justify-between h-full">
      <div>
        <input
          value={value}
          type="text"
          id="up-video"
          onChange={handleVideoChange}
          className=" w-[70%] mt-2 py-1 pl-1 border border-black rounded-lg"
        />
      </div>
      <div className="w-[70%] h-full">
        {video && (
          <ReactPlayer
            controls={true}
            url={video}
            width="100%"
            height="100%"
            onError={handleVideoError}
          />
        )}
      </div>
    </div>
  );
}

export default InforVideo;
