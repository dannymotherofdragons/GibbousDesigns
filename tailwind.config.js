import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // creates a utility `font-bagnard`
        bagnard: ["Bagnard", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
