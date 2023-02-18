/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        login: "url('../public/background.jpg')",
      },
    },
    colors: {
      success: "#49be25",
      error: "#de5349",
      gray: "#a3a3a3",
      lightgray: "#Cbcece",
      white: "#fff",
      lightblue: "#89e5ff",
      blue1: "#2596be",
      neonblue: "#5468ff",
      spacecadet: "#1b264f",
    },
  },
  plugins: [],
};
