/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'md': '520px',
        'lg': '900px',
      },
    },
  },
  plugins: [],
};