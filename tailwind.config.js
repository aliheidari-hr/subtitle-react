/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'white-50': 'rgba(255, 255, 255, 0.05)',
        'white-80': 'rgba(255, 255, 255, 0.08)',
        'black-50': 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}