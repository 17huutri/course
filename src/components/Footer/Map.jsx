import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.6517496351347!2d106.80563732530618!3d10.843621921984425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175272a23a98209%3A0xae318ad0f747de5e!2zQ8O0bmcgQW4gxJDhu6luZw!5e0!3m2!1svi!2s!4v1699405485568!5m2!1svi!2s"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
