/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5c55c9",
        destructive: "#dd3359",
        "dark-primary": "#494495",
        "dark-destructive": "#d23357",
      },
      transitionProperty: {
        width: "width",
        border: "border,border-radius,box-shadow,background-color",
      },
    },
  },
  plugins: [],
};
