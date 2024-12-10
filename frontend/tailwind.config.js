/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-1': 'rgba(141, 140, 140, 0.65)',
        'gray-2': 'rgba(141, 140, 140, 1)',
        'light-1': 'rgba(255, 255, 255, 0.2)',
        'gray-3': 'rgba(0, 0, 0, 0.3)',
        'bg-color': '#83BBA7',
        'item-color': '#CBE5DB',
      },
    },
  },
  plugins: [],
};

