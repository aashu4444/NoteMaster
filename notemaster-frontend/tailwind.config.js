module.exports = {
  darkMode: 'class',
  content: [
	"./pages/**/*.{js,ts,jsx,tsx}",
	"./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pop': 'pop 1s'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
