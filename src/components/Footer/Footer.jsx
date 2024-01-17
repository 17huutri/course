import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Map from "./Map";

function Footer() {
  return (
    <div className="bg-black  px-10 py-6 w-full text-white">
      <div className="flex  lg:flex-row sm: flex-col justify-between h-full items-start">
        <div className="lg:w-1/3 sm: w-full lg:mb-0 sm: mb-4 flex flex-col justify-between">
          <div className="w-[200px] mx-auto">
            <img
              src="/assests/images/LogoApp.png"
              className="w-full h-full "
              alt=""
            />
          </div>
          <p>
            S Education is an online education platform specializing in
            programming, offering high-quality courses to help you develop your
            skills in this field.
          </p>
        </div>
        <div className="lg:w-1/3 sm: w-full lg:mb-0 sm: mb-4 flex flex-col items-center">
          <h3 className="font-bold text-2xl lg:mb-4 sm: mb-0">
            You can find us at
          </h3>
          <div className="flex ">
            <div className="w-10 h-10 flex justify-center items-center">
              <a
                className="hover:text-blue-500"
                target="_blank"
                href="https://www.facebook.com/"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div className="w-10 h-10 flex justify-center items-center">
              <a
                className="hover:text-pink-400"
                target="_blank"
                href="https://www.instagram.com/"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className="w-10 h-10 flex justify-center items-center">
              <a
                className="hover:text-blue-400"
                target="_blank"
                href="https://twitter.com/"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div className="w-10 h-10 flex justify-center items-center">
              <a
                className="hover:text-red-600"
                target="_blank"
                href="https://www.youtube.com/"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 sm: w-full h-5/6 ">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Footer;
