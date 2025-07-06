export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradientBG 15s ease infinite",
        gradientSlow: "gradientBG 15s ease infinite", // alias
        fadeInUp: "fadeInUp 0.7s ease-out forwards",
        orbit: "orbit 6s infinite linear", // Added orbit animation
        pulseInfinite: "pulse-infinite 3s infinite", // Added pulse-infinite animation
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(0) rotate(0deg)" },
          "25%": { transform: "rotate(90deg) translateX(10px) rotate(-90deg)" },
          "50%": { transform: "rotate(180deg) translateX(0) rotate(-180deg)" },
          "75%": { transform: "rotate(270deg) translateX(-10px) rotate(-270deg)" },
          "100%": { transform: "rotate(360deg) translateX(0) rotate(-360deg)" },
        },
        "pulse-infinite": {
          "0%": { textShadow: "0 0 15px rgba(0,191,255,0.9), 0 0 5px rgba(0,191,255,0.7)", transform: "scale(1)" },
          "50%": { textShadow: "0 0 20px rgba(0,191,255,1), 0 0 10px rgba(0,191,255,0.9)", transform: "scale(1.03)" },
          "100%": { textShadow: "0 0 15px rgba(0,191,255,0.9), 0 0 5px rgba(0,191,255,0.7)", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};