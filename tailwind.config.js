/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        kenya: {
          black: "#000000",
          red: "#BE0C2D",
          green: "#007A4D",
          white: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: ['"Google Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}