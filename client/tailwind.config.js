module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      slab: ["Roboto Slab", "serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      animation: {
        wiggle: "wiggle 0.5s ease-in-out ",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
