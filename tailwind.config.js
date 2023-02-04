/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,js}'],
  theme: {
    extend: {
      spacing: {
        '100px': '100px',
        '150px': '150px',
        '180px': '180px',
        '250px': '250px',
        '350px': '350px',
      },
    },
  },
  plugins: [],
};
