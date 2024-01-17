import React, { useState } from "react";
import ReactPlayer from "react-player";

function CurricuUrl() {
  const [video, setVideo] = useState(null);
  const [link, setLink] = useState(false);
  const [invalidVideo, setInvalidVideo] = useState(true);
  const handleVideoError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    e.currentTarget.style = "display:none";
    setInvalidVideo(true);
  };
  const handleVideoChange = (video) => {
    // onChange(video);
    setVideo(video.target.value);
    setInvalidVideo(false);
  };
  const handleClickLabel = () => {
    setLink(!link);
  };
  return (
    <div>
      <div className="flex mb-4">
        <label
          onClick={handleClickLabel}
          htmlFor="upURL"
          className="border border-solid border-black px-3 py-1 rounded-lg"
        >
          Upload video by URL
        </label>
        {link && (
          <input
            onChange={handleVideoChange}
            type="text"
            className=" ml-2 border border-solid border-black rounded-lg"
            id="upURL"
            name="upURL"
            placeholder="URL......."
          />
        )}
      </div>
      {video && (
        <div className="h-[300px]">
          <ReactPlayer
            controls={true}
            url={video}
            width="100%"
            height="100%"
            onError={handleVideoError}
          />
        </div>
      )}
    </div>
  );
}

export default CurricuUrl;
