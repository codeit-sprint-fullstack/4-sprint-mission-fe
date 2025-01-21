/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { min: '375px', max: '743px' },
      md: { min: '743px', max: '1199px' },
      lg: { min: '1200px' },
    },
    extend: {},
  },
  plugins: [],
};
