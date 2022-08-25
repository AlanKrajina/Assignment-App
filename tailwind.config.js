module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeOut .6s ease-in-out",
      },
      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1 },
        },
      }),
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
