import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function CurricuFile() {
  const [video, setVideo] = useState(null);
  const [invalidVideo, setInvalidVideo] = useState(true);
  const handleVideoError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    e.currentTarget.style = "display:none";
    setInvalidVideo(true);
  };
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVideo(URL.createObjectURL(event.target.files[0]));
      setInvalidVideo(false);
      console.log(event.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <input
          onChange={onVideoChange}
          type="file"
          name="upFile"
          id="upFile"
          className="!hidden"
        />
        <label
          htmlFor="upFile"
          className="border border-solid border-black px-3 py-1 rounded-lg"
        >
          Upload video by File
        </label>
      </div>
      {video && (
        <div className="">
          <video
            className="block h-[300px] w-full"
            controls
            autoPlay
            key={video}
          >
            <source src={video} />
          </video>
        </div>
      )}
    </div>
  );
}

export default CurricuFile;
