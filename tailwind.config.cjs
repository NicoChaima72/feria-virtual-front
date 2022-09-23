/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    // container: {
    //   center: true,
    //   margin: 0,
    //   padding: {
    //     DEFAULT: "1rem",
    //     sm: "2rem",
    //     lg: "4rem",
    //     xl: "6rem",
    //     "2xl": "6rem",
    //   },
    // },
  },
  plugins: [require("flowbite/plugin")],
};
