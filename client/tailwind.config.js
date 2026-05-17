/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 20px rgba(59,130,246,0.45), 0 0 40px rgba(139,92,246,0.25)",
      },
      dropShadow: {
        neon: "0 0 8px rgba(59,130,246,0.65)",
      },
      animation: {
        'pulse-slow': 'pulse 2.5s ease-in-out infinite',
      },
    }

  },
  plugins: [],
};
