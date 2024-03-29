/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./content/*.md",
    "./pages/*.vue",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["Arvo", "serif"],
        lora: ["Lora", "serif"],
        merri: ["Merriweather", "serif"],
       },
       transitionProperty: {
        'width': 'width'
    },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}