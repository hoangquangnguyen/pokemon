/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html","./src/**/*.{vue,ts,html}"],
  purge: ["./src/**/*.{vue,ts,html,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
