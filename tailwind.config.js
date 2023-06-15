/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark_back': '#0F171D',
        'dark_surf': '#141E26',
      },
    },
  },
  plugins: [],
  safelist: [
    'details_body',
    'toast_head',
    'toast_body',
    'toast_green',
    'toast_red',
  ]
}