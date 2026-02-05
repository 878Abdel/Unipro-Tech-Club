/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        utcBlue: '#2D3382', // Bleu du logo
        utcRed: '#E31E24',  // Rouge du logo
        glass: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'martian': ['"Martian Mono"', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}