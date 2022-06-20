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
        'li-gray': {
          0: '#fff',
          100: '#f0f0f0',
          200: '#dddddd',
          300: '#cccccc',
          400: '#bbbbbb',
          500: '#aaaaaa',
          600: '#999999',
          700: '#888888',
          800: '#777777',
          900: '#666666',
          1000: '#555555',
          1100: '#444444',
          1200: '#333333',
          1300: '#222222',
          1400: '#161616',
          1500: '#0c0c0c',
        },
        'li-green': {
          main: '#1e855e',
        },
      },
    },
  },
  plugins: [],
}
