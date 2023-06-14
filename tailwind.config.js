/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark_back': '#0F171D',
        'dark_surf': '#131D25',
      },
    },
  },
  plugins: [],
  safelist: [
    'details_body',
  ]
}