/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg,html}', './public/index.html'],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
