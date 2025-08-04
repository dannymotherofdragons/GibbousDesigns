// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust to match your paths
  ],

  theme: {
    extend: {
      perspective: {
        1000: "1000px",
      },
      keyframes: {
        marqueeY: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "marquee-slow": "marqueeY 18s linear infinite",
      },
    },
  },

  plugins: [],
};
