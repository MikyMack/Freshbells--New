/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '4rem',
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "425px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {

        titleFont: ["Rubik", "sans-serif"],
        body3:["Rubik", "sans-serif"],
      },
      colors: {
        primeColor: "#163020", 
        lightText: "#ff5f5f", 
      },
      boxShadow: { 
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
    
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

