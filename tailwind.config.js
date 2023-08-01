/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg,html}', './public/index.html'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '480px' },
        sm: { max: '640px' },
        md: { max: '768px' },
        lg: { min: '769px', max: '1024px' },
        xl: { min: '1025px', max: '1365px' },
        '2xl': '1366px',
        '4xl': '1920px',
      },
      colors: {
        diary: {
          primary: '#376BED',
          danger: '#dc2626',
        },
        blue: '#376BED',
        'gradient-home-from': 'var(--gradient-home-from)',
      },
      backgroundImage: {
        gradient: 'var(--gradient)',
        'gradient-1': 'repeating-linear-gradient(to right, var(--gradient-1-from), var(--gradient-1-to))',
        'gradient-2': 'repeating-linear-gradient(to right, var(--gradient-2-from), var(--gradient-2-to))',
        'gradient-3': 'repeating-linear-gradient(to right, var(--gradient-3-from), var(--gradient-3-to))',
        'gradient-4': 'repeating-linear-gradient(to right, var(--gradient-4-from), var(--gradient-4-to))',
        'gradient-home': 'var(--gradient-home)',
      },
      fontFamily: {
        DDin: ['D-DIN'],
      },
    },
  },
  plugins: [],
};
