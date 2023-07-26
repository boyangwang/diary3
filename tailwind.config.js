/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg,html}', './public/index.html'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        // diary: {
        gradient: 'var(--gradient)',
        'gradient-1': 'repeating-linear-gradient(to right, var(--gradient-1-from), var(--gradient-1-to))',
        'gradient-2': 'repeating-linear-gradient(to right, var(--gradient-2-from), var(--gradient-2-to))',
        'gradient-3': 'repeating-linear-gradient(to right, var(--gradient-3-from), var(--gradient-3-to))',
        'gradient-4': 'repeating-linear-gradient(to right, var(--gradient-4-from), var(--gradient-4-to))',
        // },
      },
    },
  },
  plugins: [],
};
