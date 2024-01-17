import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function InforImage({ onChange, value }) {
  const { formValue } = useSelector((state) => state.createCourseReducer);
  const [image, setImage] = useState(null);
  const [invalidImage, setInvalidImage] = useState(true);
  const handleImageError = (e) => {
    e.currentTarget.src = "";
    e.currentTarget.className = "error";
    e.currentTarget.style = "display:none";
    setInvalidImage(true);
  };
  const handleImageChange = (Image) => {
    onChange(Image);
    setImage(Image.target.value);
    setInvalidImage(false);
  };

  useEffect(() => {
    setImage(formValue.imageMain);
  }, [formValue]);
  return (
    <div className="flex justify-between h-full">
      <div>
        <input
          value={value}
          type="text"
          id="up-img"
          onChange={handleImageChange}
          className="w-[70%] mt-2 py-1 pl-1 border border-black rounded-lg"
        />
      </div>
      <div className="w-[70%] h-full">
        {image && (
          <img
            alt="preview image"
            src={image}
            className="w-full h-full"
            onError={(e) => handleImageError(e)}
            onLoad={(e) => (e.currentTarget.className = "success")}
          />
        )}
      </div>
    </div>
  );
}

export default InforImage;
