/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#001532",
          slate: "#132430",
        },
        steel: "#8d9fb4",
        sky: "#c3d6e2",
        cream: "#f7f5f0",
        sand: "#d4a373",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.35" },
          "50%": { transform: "scale(1.15)", opacity: "0.55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        breathe: "breathe 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
