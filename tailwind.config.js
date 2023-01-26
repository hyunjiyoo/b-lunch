/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts,js}'],
  theme: {
    extend: {
      spacing: {
        '23%': '23%',
        '150px': '150px',
        '250px': '250px',
        '350px': '350px',
      },
    },
  },
  plugins: [],
};
