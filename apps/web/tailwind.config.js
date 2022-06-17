module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          0: '#fff',
          50: '#ebebeb',
          100: '#d7d7d7',
          200: '#c4c4c4',
          300: '#adadad',
          400: '#999999',
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#333333',
          900: '#222222',
        },
      },
    },
  },
  plugins: [],
}
