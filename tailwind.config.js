/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    extend: {
      fontFamily: {
        sharp: ["Sharp Grotesk", "sans-serif"],
      },
      borderColor: {
        customGrey: "#131212",
        customGreen: "#7d8d7b",
      },
    },
  },
  darkMode: "class",
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
