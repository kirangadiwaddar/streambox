/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF204E",
      },
      fontFamily: {
        "host" : ["Host Grotesk", "sans-serif"],
      }
    },
  },
  plugins: [],
}