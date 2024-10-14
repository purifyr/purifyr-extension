/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('daisyui'),
  ],
  daisyui: {
    logs: false,
    themes: ['nord', 'dark'],
    darkTheme: 'nord',
    utils: true,
  },
}
