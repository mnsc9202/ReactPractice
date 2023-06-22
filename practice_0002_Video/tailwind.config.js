/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        moveVideoIndexToggle: "#23689B",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".videoController": {
          WebkitAppearance: "none", // 기본속성 제거
          width: "100%",
          cursor: "pointer",
          borderRadius: 30,
          background: "#F8F6F4",
          backgroundImage: "linear-gradient(#DB005B, #DB005B)",
          backgroundSize: "0% 100%",
          backgroundRepeat: "no-repeat",

          "&:focus": {
            outline: "none",
          },

          /*----- chrome -----*/
          // 버튼
          "&::-webkit-slider-thumb": {
            WebkitAppearance: "none", // 기본속성 제거
            background: "#fff",
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            marginTop: 12 / 2 - 18 / 2, // (트랙높이/2) - (thumb높이/2)
            cursor: "pointer",
            boxShadow: "0 0 3px 0 #00000029",
          },

          // 버튼 (포커스)
          "&:focus::-webkit-slider-thumb": {
            border: "2px solid #DB005B",
            background: "#DB005B",
            outline: "3px solid #fff",
          },

          "&::-webkit-slider-runnable-track ": {
            WebkitAppearance: "none", // 기본속성 제거
            boxShadow: "none",
            background: "transparent",
            height: 12,
          },
        },

        ".soundController": {
          WebkitAppearance: "none", // 기본속성 제거
          width: 100,
          height: 10,
          cursor: "pointer",
          borderRadius: 30,
          background: "#F8F6F4",
          backgroundImage: "linear-gradient(#0A6EBD, #0A6EBD)",
          backgroundSize: "0% 100%",
          backgroundRepeat: "no-repeat",
          border: "1px solid #fff",

          "&::-webkit-slider-thumb": {
            WebkitAppearance: "none", // 기본속성 제거
            height: "10px",
            width: "10px",
          },
          transform: `rotate(-90deg) translate(50%, 0%)`,
        },
      });
    }),
  ],
};
