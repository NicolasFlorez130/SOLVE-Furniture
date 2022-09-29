/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            'cabinet': ['Cabinet Grotesk', 'sans-serif'],
            'new-york': ['NewYork', 'sans-serif']
         },
         colors: {
            'texts': '#343339',
            'titles': '#FFF',
            'background': '#EDEDED'
         }
      }
   },
   plugins: [
      plugin(({ addBase, theme }) => {
         addBase({
            '*': { fontFamily: 'Cabinet Grotesk' },
            'html': { color: '#343339', backgroundColor: '#EDEDED' },
            'h1': { fontFamily: 'NewYork' },
            'h2': { fontFamily: 'NewYork' },
            'h3': { fontFamily: 'NewYork' },
            'h4': { fontFamily: 'NewYork' },
            'p': { fontSize: '1.2rem', lineHeight: '2rem' }
         })
      })
   ],
}