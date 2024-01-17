import React from "react";
import { Feedbacks } from "./Features/Fact";
import Slider from "react-slick";
import SliderWrapper from "../../common/SlickSliderStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function FeedbackCenter() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    speed:2000,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear"
  };

  return (
    <div className=" grid md:grid-cols-2 sm: grid-cols-1 py-[60px] "
   
    >
      <div className="col-span-1  flex justify-center items-center">
        <img
          className="w-[300px] rounded-[50%] bg-background_gradient_2 h-[300px]"
          src="/assests/images/feedback.png"
        />
      </div>
      <div className="col-span-1 md:pr-[30%] md:pl-0 sm: px-[15%]">
        <h1 className="lg:text-[50px]  sm: text-[35px] px-[8px] text-[#000000b3] pb-2 pt-6 font-cabin font-semibold"
        style={{textShadow: "-11px 10px 8px #909090b3"}}>
          What Client Think About Us
        </h1>

        <SliderWrapper>
          {" "}
          <Slider {...settings} className="pt-4">
            {Feedbacks &&
              Feedbacks.map((feedback, index) => (
                <div key={index} className="px-[8px]">
                <FontAwesomeIcon className="text-[#4585bd] text-[25px]" icon={faQuoteLeft} flip="vertical" />
                  <p className="text-[#5d6775] lg:text-[16px] md:text-[13px]">
             
                    {feedback.description}
                  </p>
                  <p className="pt-[10px] font-semibold lg:text-[20px] md:text-[15px] text-[#004a89]">
                    {feedback.nameClient}
                  </p>
                  <p className="pb-[10px] text-[#5d6775] lg:text-[16px] md:text-[13px]">{feedback.career}</p>
                </div>
              ))}
          </Slider>
        </SliderWrapper>
      </div>
    </div>
  );
}
