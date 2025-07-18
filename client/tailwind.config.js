// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        base: '#FFFFF3',
        accent1: '#FF4365',
        accent2: '#00D9C0',
        sub: '#B7AD99',
        text: '#030301',
      },
      fontSize: {
        base: '16px',
        lg: '18px',
        title: '24px',
      },
    },
  },
  plugins: [],
};
