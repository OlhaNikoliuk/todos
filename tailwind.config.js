const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        dark: "#161a2b",
        bright: "#5d0cff",
      },

      backgroundImage: {
        "main-gradient":
          "linear-gradient(90deg, rgba(93, 12, 255, 1) 0%,    rgba(155, 0, 250, 1) 100%  )",
        "0n": "linear-gradient(90deg,    rgba(93, 12, 255, 1) 0%,    rgba(155, 0, 250, 1) 100% )",
        "1n": " linear-gradient(    90deg,    rgba(20, 159, 255, 1) 0%,    rgba(17, 122, 255, 1) 100%  )",
        "2n": "linear-gradient(    90deg,    rgba(255, 12, 241, 1) 0%,    rgba(250, 0, 135, 1) 100%  )",
        "3n": "linear-gradient(  90deg,    rgba(255, 118, 20, 1) 0%,    rgba(255, 84, 17, 1) 100%  )",
      },

      minHeight: {
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
      },

      borderWidth: {
        1: "1px",
        2: "2px",
      },

      width: {
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
      },

      boxShadow: {
        default: "0px 0px 8px 0px rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchVariant }) {
      matchVariant(
        "nth",
        (value) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: "n", // Default value for `nth:`
            "2n": "2n", // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
            "3n": "3n",
            "4n+1": "4n+1",
            "4n+2": "4n+2",
            "4n+3": "4n+3",
            "5n": "5n",
          },
        }
      );
    }),
  ],
};
