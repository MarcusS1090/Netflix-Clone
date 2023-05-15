/** @type {import('tailwindcss').Config} */
/* vamos a decirle a que tipo de archivos y en que raiz vamos a usar tailwind styles
*/
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

