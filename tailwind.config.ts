/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'md': '720px',
        'lg': '950px',
      },
    },
  },
  plugins: [],
};