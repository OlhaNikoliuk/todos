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
        grey: "#808080",
      },

      backgroundImage: {
        "main-gradient":
          "linear-gradient(90deg, rgba(93, 12, 255, 1) 0%,    rgba(155, 0, 250, 1) 100%  )",
        "back-button":
          "linear-gradient(90deg, rgba(91,4,149,1) 0%, rgba(209,45,83,1) 100%)",
        notFound: "url('images/notFound.png')",
      },

      height: {
        "1px": "1px",
        "2px": "2px",
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
        hover:
          "0px 3px 8px rgba(20, 20, 30, 0.05), 0px 6px 15px rgba(20, 20, 30, 0.05)",
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
