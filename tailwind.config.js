/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
      },
      backgroundColor: {
        background_1: "#0a1024",
        background_2: "#7743DB",
        background_3: "#ede4ff36",
      },
      backgroundImage: {
        background_gradient_2:
          "linear-gradient(15deg, #4585bd 50%, #F8F8F8 50%);",
        background_gradient_1:
          "linear-gradient(143deg, rgb(62 67 85) 25%, rgb(189 189 189) 74%)",

        background_gradient_3:
          "linear-gradient(20deg, #48689c 28%, #efefef00 63%);",
        // background_img_1: ""
      },
      colors: {
        //blue
        blue_1: "#BADDF0", //bg-color for sign-in/up pages
        blue_2: "#0075FF",
        blue_3: "#0063D7", //h1 tittle color
        blue_4: "rgba(0, 56, 255, 0.71)",
        blue_5: "#0041E7",
        //purple
        purple_1: "#7743DB",
        //yellow
        yellow_1: "#FAC337", //rating-color

        //green
        green_1: "rgba(213, 240, 209, 0.38)",
        green_2: "rgba(225, 240, 206, 0.58)",
        green_3: "rgba(12, 144, 0, 0.19)",
        //red
        red_1: "rgba(164, 0, 0, 0.07)",
        //text-color-base
        text_color_base: "rgba(52, 52, 52, 0.88)",
        text_color_2: "rgba(132, 132, 132, 0.88)",

        //gray
        gray_1: "#F8F8F8",
        gray_2: "#dbdbdb",
        gray_6: "rgba(232, 232, 232, 0.63)",
        gray_3: "#939393",

        gray_4: "rgba(0, 0, 0, 0.30)", //border
        gray_5: "rgba(238, 238, 238, 0.47)", //bg-color
        gray_9: "rgba(0, 0, 0, 0.78)", //bg-color-gray
      },

      boxShadow: {
        box_shadow_1: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        box_shadow_2: "0px 0px 5px 0px rgba(88, 88,88, 0.46)",
        box_shadow_3: "5px 5px 0px 5px white",
        box_shadow_4: "5px -5px 0px 5px white",
        box_shadow_5: "0px 11px 13px -10px rgba(0, 0,0, 0.15)",
        box_shadow_6: "10px 2px 12px 0px rgb(233 233 233)",
        box_shadow_7: "3px 3px 1px 0px black",
        box_shadow_8: "0px 0px 6px 1px #a8a8a826",
        box_shadow_9: "0px 0px 9px 1px #aea1a166",
      },
      borderRadius: {
        box_radius_2: "86% 105% 98% 107% / 57% 137% 110% 194%",
        box_radius_1: "80px 0px 0px 80px",
        box_radius_3: "70% 105% 136% 85% / 80% 152% 121% 177%;",
      },
    },
  },
  plugins: [],
};
